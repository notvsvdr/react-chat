import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';

class ColorPanel extends Component {
    render() {
        return (
            <Sidebar
                as={Menu}
                vertical
                visible
                width='very thin'
                icon='labeled'
                inverted
            >

                <Divider />
                <Button color='blue' icon='add' size='small' />
            </Sidebar>
        );
    }
}

export default ColorPanel;