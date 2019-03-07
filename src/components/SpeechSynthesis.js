import React from 'react';
import { Button, TextArea } from 'semantic-ui-react';
class SpeechSynthesis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
        this.speaker = new SpeechSynthesisUtterance();
    }

    toggle = (startOver = true) => {
        window.speechSynthesis.cancel();
        if (startOver) {
            this.speaker.text = this.state.msg;
            window.speechSynthesis.speak(this.speaker);
        }
    }

    handleChange = (e) => {
        this.setState({
            msg: e.target.value
        });
    }

    render() {
        return (
            <div className="voiceinator">
                <h1>The Speaker</h1>

                <TextArea
                    name='text'
                    onChange={this.handleChange}
                    value={this.state.msg}
                />
                <Button onClick={this.toggle}>Start/Stop</Button>
            </div >
        );
    }
}

export default SpeechSynthesis;