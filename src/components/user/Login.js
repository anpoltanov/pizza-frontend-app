import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import {login, fetchUser} from '../../actions/user/login';
import LoginForm from "./LoginForm";

class Login extends React.Component{
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        login: PropTypes.func.isRequired,
        fetchUser: PropTypes.func.isRequired,
    };

    render() {
        if (this.props.loggedIn) {
            return (<Redirect to={`/`} />);
        } else {
            return (
                <div>
                    {this.props.loading && (
                        <div className="alert alert-info" role="status">
                            Loading...
                        </div>
                    )}
                    {this.props.error && (
                        <div className="alert alert-danger" role="alert">
                            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                            {this.props.error}
                        </div>
                    )}
                    <LoginForm handleSubmit={function(e) {
                        this.handleLogin(e);
                    }.bind(this)} error={this.props.error} />
                </div>
            )
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        this.props.login(data);
    }
}

const mapStateToProps = state => {
    const {user, loggedIn, error, loading} = state.user.login;
    return {user, loggedIn, error, loading};
}

const mapDispatchToProps = dispatch => ({
    login: values => dispatch(login(values)),
    fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);