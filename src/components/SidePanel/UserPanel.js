import React from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';

class UserPanel extends React.Component {

    dropdownOptions = () => {
        return [
            {
                key: 'user',
                text: <span>Signed in as <strong>User</strong></span>,
                disabled: true
            },
            {
                key: 'avatar',
                text: <span>Change avatar</span>,
                disabled: false
            },
            {
                key: 'sign-out',
                text: <span>Sing out</span>,
                disabled: false
            }
        ];
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
                    </Grid.Row>
                    <Header style={{ padding: '0.25em' }} as='h4' inverted>
                        <Dropdown trigger={
                            <span>User</span>
                        } options={this.dropdownOptions()} />
                    </Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;