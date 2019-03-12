import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';

const App = ({ currentUser, currentChannel }) => {
    return (
        <Grid columns='equal' className='app' style={{ background: '#eee' }}>

            <ColorPanel />

            <SidePanel
                currentUser={currentUser}
                key={currentUser && currentUser.uid}
            />

            <Grid.Column style={{ marginLeft: '320px' }}>
                <Messages
                    currentChannel={currentChannel}
                    currentUser={currentUser}
                    key={currentChannel && currentChannel.id}
                />
            </Grid.Column>

            <Grid.Column width={4}>
                <MetaPanel />
            </Grid.Column>
            <Button className="justforfun" onClick={() => { this.props.history.push('/justforfun') }}>?</Button>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        currentChannel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(App);
