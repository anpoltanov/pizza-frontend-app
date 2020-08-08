import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import i18next from "../translations";
// import {fetchUser, logout} from "../actions/loginAction";

class UserProfile extends React.Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        // fetchUser: PropTypes.func.isRequired,
        // logout: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        // this.props.fetchUser();
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"
                          aria-expanded="false">{i18next.t('common.profile')} {this.props.user['name']}</span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a onClick={this.initLogout} className="dropdown-item" href="/logout">{i18next.t('common.logout')}</a>
                    </div>
                </li>
            );
            // return (<NavLink to="/profile/">{i18next.t('common.profile')} {this.props.user['name']}</NavLink>);
        } else {
            return (
                <li className="nav-item">
                    {this.props.loading || this.props.user === null ? '' : <Redirect to="/"/>}
                    <NavLink to="/" className="nav-link">{i18next.t('common.login')}</NavLink>
                </li>
            )
        }
    }

    initLogout(e) {
        e.preventDefault();
        this.props.logout();
    }
}

const mapStateToProps = state => {
    const {user, loggedIn, error, loading} = state.login;
    return {user, loggedIn, error, loading};
}

const mapDispatchToProps = dispatch => ({
    // fetchUser: () => dispatch(fetchUser()),
    // logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);