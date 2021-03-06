import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';

class MessageForm extends React.Component {
    state = {
        message: '',
        user: this.props.currentUser,
        channel: this.props.currentChannel,
        loading: false,
        errors: []
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendMessage = () => {
        const { message, channel } = this.state;
        const { messagesRef } = this.props;

        if (message) {
            this.setState({
                loading: true
            });
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({
                        loading: false,
                        message: '',
                        errors: []
                    })
                })
                .catch((e) => {
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(e)
                    });
                });
        } else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message' })
            });
        }
    }

    createMessage = () => {
        const message = {
            content: this.state.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            }
        }
        return message;
    }

    render() {
        const { errors, message, loading } = this.state;

        return (
            <Segment className='message__form'>
                <Input
                    autoComplete='off'
                    fluid
                    name='message'
                    style={{ marginBottom: '0.7em' }}
                    label={<Button icon='add' />}
                    labelPosition='left'
                    placeholder='Write your message'
                    onChange={this.handleChange}
                    className={
                        errors.some((e) => e.message.includes('message')) ? 'error' : ''
                    }
                    value={message}
                />
                <Button.Group icon widths='2'>
                    <Button
                        color='orange'
                        content='Add Reply'
                        labelPosition='left'
                        icon='edit'
                        onClick={this.sendMessage}
                        disabled={loading}
                    />
                    <Button
                        color='teal'
                        content='Upload Media'
                        labelPosition='right'
                        icon='cloud'
                    />
                </Button.Group>
            </Segment>
        );
    }
}

export default MessageForm;