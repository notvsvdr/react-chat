import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase from '../../firebase';

class Messages extends Component {
    state = {
        messagesRef: firebase.database().ref('messages'),
        currentChannel: this.props.currentChannel,
        currentUser: this.props.currentUser
    }
    render() {
        const { messagesRef, currentChannel, currentUser } = this.state;

        return (
            <React.Fragment>
                <MessagesHeader />
                <Segment>
                    <Comment.Group className='messages'>
                        {/*Messages*/}
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