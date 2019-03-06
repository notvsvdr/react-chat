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
import Spinner from './components/spinner';
import SpeechSynthesis from './components/SpeechSynthesis';

// style
import 'semantic-ui-css/semantic.min.css';

// firebase
import firebase from './firebase';

// redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions/index';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Root extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user);
                this.props.history.push('/');
            } else {
                this.props.history.push('/login');
                this.props.clearUser();
            }
        });
    }

    render() {
        return (
            this.props.isLoading
                ? <Spinner />
                : <Switch>
                    <Route exact path='/' component={App} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/justforfun' component={SpeechSynthesis} />
                </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    }
}

const RootWithRoute = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithRoute />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
