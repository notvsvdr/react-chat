import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';

class Channels extends React.Component {
    state = {
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        isModalOpen: false,
        channelsRef: firebase.database().ref('channels'),
        firstLoad: true,
        activeChannel: ''
    }

    componentDidMount() {
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    removeListeners = () => {
        this.state.channelsRef.off();
    }

    addListeners = () => {
        let loadedChannels = [];

        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            this.setState({ channels: loadedChannels }, () => {
                this.setFirstChannel()
            });
        });
    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if (this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);
        }
        this.setState({ firstLoad: false });
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        });
    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.isFormValid(this.state)) {
            return;
        }

        this.addChannel();
    }

    isFormValid = ({ channelName, channelDetails }) => {
        return channelName && channelDetails;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addChannel = () => {
        const { channelsRef, channelName, channelDetails, user } = this.state;

        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({
                    channelName: '',
                    channelDetails: ''
                })
                this.closeModal();
                console.log('channel added');
            })
            .catch(e => {
                console.error(e);
            });
    }

    displayChannels = (channels) => {
        return channels.length > 0 && channels.map((channel) =>
            <Menu.Item
                key={channel.id}
                onClick={() => { this.changeChannel(channel) }}
                name={channel.name}
                style={{ opacity: 0.7 }}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}
            </Menu.Item>
        )
    }

    changeChannel = (channel) => {
        this.props.setCurrentChannel(channel);
        this.setActiveChannel(channel);
    }

    setActiveChannel = (channel) => {
        this.setState({
            activeChannel: channel.id
        });
    }

    render() {
        const { channels, isModalOpen } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name='exchange' /> Channels
                        </span>{' '}
                        ({channels.length}) <Icon name='add' onClick={this.openModal} />
                    </Menu.Item>
                    {this.displayChannels(channels)}
                </Menu.Menu>

                <Modal basic open={isModalOpen} onClose={this.closeModal}>
                    <Modal.Header>
                        Add a channel
                    </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    fluid
                                    label='Name of channel'
                                    name='channelName'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    fluid
                                    label='Details of channel'
                                    name='channelDetails'
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.handleSubmit}>
                            <Icon name='checkmark' /> Add
                        </Button>
                        <Button color='red' inverted onClick={this.closeModal}>
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default connect(null, { setCurrentChannel })(Channels);