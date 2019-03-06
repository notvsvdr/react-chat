import React from 'react';
class SpeechSynthesis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
    }

    toggle = (startOver = true) => {
        speechSynthesis().cancel();
        if (startOver) {
            speechSynthesis().speak(this.state.msg);
        }
    }

    handleChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }

    componentDidMount() {
        // speech
    }

    render() {
        return (
            <div className="voiceinator">
                <h1>The Speaker</h1>

                <textarea name="text" value={this.state.msg} onChange={this.handleChange}> Hello!</textarea>

                <button id="stop">Stop!</button>
                <button id="speak" onClick={this.toggle}>Speak</button>
            </div >
        );
    }
}

export default SpeechSynthesis;