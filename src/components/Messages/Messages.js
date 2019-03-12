import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';

class Messages extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        currentChannel: this.props.currentChannel,
        currentUser: this.props.currentUser,
        messages: [],
        messagesLoading: true
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
            })
        })
    }

    displayMessages = (messages) => {
        return messages.length > 0 && messages.map((message) =>
            <Message
                key={message.timestamp}
                message={message}
                currentUser={this.state.currentUser}
            />
        )

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