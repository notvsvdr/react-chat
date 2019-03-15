import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messagesRef: firebase.database().ref('messages'),
            messages: [],
            messagesLoading: true,
            currentChannel: this.props.currentChannel,
            currentUser: this.props.currentUser
        }
    }

    componentDidMount() {
        const { currentChannel, currentUser } = this.state;

        if (currentChannel && currentUser) {
            this.addListeners(currentChannel.id);
        }
    }

    addListeners = (channelId) => {
        this.addMessageListener(channelId);
    }

    addMessageListener = (channelId) => {
        let loadedMessages = [];

        this.state.messagesRef.child(channelId).on('child_added', (snap) => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });
            const domMessages = document.querySelector('.messages');
            domMessages.scrollTop = domMessages.scrollHeight;
        });
    }

    displayMessages = (messages) => {
        return messages.length > 0 &&
            messages.map((message) => (
                <Message
                    key={message.timestamp}
                    message={message}
                    currentUser={this.state.currentUser}
                />
            ));
    }


    render() {
        const { messagesRef, currentChannel, currentUser, messages } = this.state;

        return (
            <React.Fragment>
                <MessagesHeader />
                <Segment>
                    <Comment.Group className='messages'>
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>
                <MessageForm
                    messagesRef={messagesRef}
                    currentChannel={currentChannel}
                    currentUser={currentUser}
                />
            </React.Fragment>
        );
    }
}

export default Messages;