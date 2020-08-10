import React, { Component } from "react";
import PropTypes from 'prop-types';
import i18next from "../../translations";

class LoginForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string,
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="loginEmail">{i18next.t('common.loginUsername')}</label>
                    <input type="text" className="form-control" id="loginEmail" name="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="loginPassword">{i18next.t('common.loginPassword')}</label>
                    <input type="password" className="form-control" id="loginPassword" name="password"/>
                </div>
                <button type="submit" className="btn btn-success">
                    {i18next.t('common.loginSubmit')}
                </button>
            </form>
        );
    }
}

export default LoginForm;
