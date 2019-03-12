import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

const isOwnMessage = (message, currentUser) => {
    return message.user.id === currentUser.uid ? 'message__self' : '';
}

const timeFromNow = (timestamp) => {
    return moment(timestamp).fromNow();
}

const Message = ({ message, currentUser }) =>
    <Comment>
        <Comment.Avatar src={message.user.avatar} />
        <Comment.Content
            className={isOwnMessage(message, currentUser)}
        >
            <Comment.Author as='a'>{message.user.displayName}</Comment.Author>
            <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
            <Comment.Text>{message.content}</Comment.Text>
        </Comment.Content>
    </Comment>


export default Message;