import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends React.Component {
    state = {
        channels: [],
        channelName: '',
        channelDetails: '',
        isModalOpen: false
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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

                </Menu.Menu>

                <Modal basic open={isModalOpen} onClose={this.closeModal}>
                    <Modal.Header>
                        Add a channel
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
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
                        <Button color='green' inverted >
                            <Icon name='checkmark' /> Add
                        </Button>
                        <Button color='red' inverted >
                            <Icon name='remove' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Channels;