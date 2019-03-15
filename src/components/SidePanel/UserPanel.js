import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.currentUser
        }
    }

    dropdownOptions = () => {
        return [
            {
                key: 'user',
                text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
                disabled: true
            },
            {
                key: 'avatar',
                text: <span onClick={this.handleChangeAvatar}>Change avatar</span>,
                disabled: false
            },
            {
                key: 'signout',
                text: <span onClick={this.handleSignOut}>Sing out</span>,
                disabled: false
            }
        ];
    }

    handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            console.log('signed out');
        })
    }

    handleChangeAvatar = () => {
        console.log('TODO');
    }

    render() {
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        <Header inverted floated='left' as='h2'>
                            <Icon name='code' />
                            <Header.Content>
                                Chat
                            </Header.Content>
                        </Header>
                        <Header style={{ padding: '0.25em' }} as='h4' inverted>
                            <Dropdown trigger={
                                <span>
                                    <Image src={this.state.user.photoURL} spaced='right' avatar />
                                    {this.state.user.displayName}
                                </span>
                            } options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}

export default (UserPanel);