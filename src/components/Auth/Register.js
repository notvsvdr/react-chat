import React, { Component } from 'react';
import { Grid, Form, Button, Segment, Icon, Message, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import '../App.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleOnSubmit = (e) => {
        if (!this.isFormValid()) {
            return;
        }
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
            })
            .catch(err => {
                console.error(err);
            });
    };

    isFormValid = () => {
        let error;

        if (this.formEmpty()) {
            error = 'Fill in all fields.';
        } else if (!this.passwordValid()) {
            error = 'Password is incorect.';
        } else {
            return true;
        }
    }

    formEmpty = () => {
        const { username, password, passwordConfirmation, email } = this.state;
        if (!username || !password || !passwordConfirmation || !email) {
            return true;
        }
    }

    passwordValid = () => {

    }

    render() {
        const { username, email, password, passwordConfirmation } = this.state;

        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' icon color='orange' textAlign='center'>
                        <Icon name='puzzle piece' color='orange' />
                        Register to DevChat
                    </Header>
                    <Form size='large' onSubmit={this.handleOnSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name='username'
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                onChange={this.handleChange}
                                type='text'
                                value={username}
                            />
                            <Form.Input
                                fluid
                                name='email'
                                icon='mail'
                                iconPosition='left'
                                placeholder='Email'
                                onChange={this.handleChange}
                                type='email'
                                value={email}
                            />
                            <Form.Input
                                fluid
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                onChange={this.handleChange}
                                type='password'
                                value={password}
                            />
                            <Form.Input
                                fluid
                                name='passwordConfirmation'
                                icon='repeat'
                                iconPosition='left'
                                placeholder='Password Confirmation'
                                onChange={this.handleChange}
                                type='password'
                                value={passwordConfirmation}
                            />

                            <Button color='orange' fluid size='large'>Confirm</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already user? <Link to='/login'>Login</Link>
                    </Message >
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;