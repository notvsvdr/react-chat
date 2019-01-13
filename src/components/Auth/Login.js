import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import '../App.css';
import {
    Grid,
    Form,
    Button,
    Segment,
    Icon,
    Message,
    Header
} from 'semantic-ui-react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.isFormValid()) {
            return;
        }
        this.setState({ errors: [], loading: true });
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.log(err);
                this.setState({ errors: this.state.errors.concat(err), loading: false })
            })
    };

    isFormValid = () => {
        const { email, password } = this.state;

        return email && password;
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
            email,
            password,
            errors,
            loading
        } = this.state;

        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>

                    <Header as='h2' icon color='violet' textAlign='center'>
                        <Icon name='code branch' color='orange' />
                        Login to Chat
                    </Header>

                    <Form size='large' onSubmit={this.handleOnSubmit}>
                        <Segment stacked>

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
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color='violet'
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
                        Do not have an account? <Link to='/register'>Register</Link>
                    </Message>

                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;