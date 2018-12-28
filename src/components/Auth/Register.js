import React, { Component } from 'react';
import md5 from 'md5';
import {
    Grid,
    Form,
    Button,
    Segment,
    Icon,
    Message,
    Header
} from 'semantic-ui-react';

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
            passwordConfirmation: '',
            errors: [],
            loading: false,
            usersRef: firebase.database().ref('users')
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    saveUser = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.isFormValid()) {
            return;
        }
        this.setState({ errors: [], loading: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                .then(() => {
                    // console.log(createdUser);
                    this.saveUser(createdUser).then(() => {
                        console.log('user saved');
                    })
                })
                .then(() => {
                    this.setState({ loading: false })
                })
                .catch((err) => {
                    console.error(err);
                    this.setState({errors: this.state.errors.concat(err), loading: false})
                })
            })
            .catch(err => {
                this.setState({ errors: this.state.errors.concat(err), loading: false });
            });
    };

    isFormValid = () => {
        let error, errors = [];

        if (this.formEmpty()) {
            error = { message: 'Fill in all fields' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: 'Password is incorect' };
            this.setState({ errors: errors.concat(error) });
            return false;
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

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = (errors) => {
        return (
            errors.map((error, i) => {
                return (
                    <p key={i}>{error.message}</p>
                );
            })
        );
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
            ? 'error'
            : '';
    }

    render() {
        const {
            username,
            email,
            password,
            passwordConfirmation,
            errors,
            loading
        } = this.state;

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
                                className={this.handleInputError(errors, 'email')}
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
                                className={this.handleInputError(errors, 'password')}
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
                                className={this.handleInputError(errors, 'passwordConfirmation')}
                            />

                            <Button
                                className={loading ? 'loading' : ''}
                                color='orange'
                                fluid
                                size='large'
                            >
                                Confirm
                            </Button>
                        </Segment>
                    </Form>

                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}

                    <Message>
                        Already user? <Link to='/login'>Login</Link>
                    </Message>

                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;