// react
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// router
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

// components
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

// style
import 'semantic-ui-css/semantic.min.css';

// firebase
import firebase from './firebase';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(() => {

}, composeWithDevTools())

class Root extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
            </Switch>
        );
    }
}

const RootWithRoute = withRouter(Root);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithRoute />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
