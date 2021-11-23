import React, { Component } from 'react';
import Header from './Header/Header';
import ScrollToTopButton from './ScrollToTopButton';
import Gallery from './Gallery';
import PhotoGallery from './PhotoGallery';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { authCheck } from '../redux/authActionCreators';

const mapStateToProps = state => {
    return {
        token: state.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    };
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.props.authCheck();
    }
    /* componentDidMount() {
        this.props.authCheck();
    } */

    render() {
        let loginRoute,
            middleRoutes,
            logoutRoute = null;
        if (this.props.token === null) {
            loginRoute = <Route path='/login' exact component={Auth} />;
        } else {
            // console.log('ELSE!');
            loginRoute = (
                <Switch>
                    <Redirect from='/login' to='/' exact />
                </Switch>
            );
        }

        middleRoutes = (
            <Switch>
                <Route
                    path='/photos/rain'
                    exact
                    render={() => <Gallery category='rain'></Gallery>}
                />
                <Route
                    path='/photos/cloud'
                    exact
                    render={() => <Gallery category='cloud'></Gallery>}
                />
                <Route
                    path='/photos/tech'
                    exact
                    render={() => <Gallery category='tech'></Gallery>}
                />
                <Route path='/' exact component={PhotoGallery} />
            </Switch>
        );

        logoutRoute = <Route path='/logout' exact component={Logout} />;

        return (
            <div>
                <Header />
                <div className='container-fluid px-md-4'>
                    {loginRoute}
                    {middleRoutes}
                    {logoutRoute}
                </div>
                <ScrollToTopButton />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
