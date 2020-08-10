import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {switchCurrency} from '../../actions/layout/currency';
import i18next from "../../translations";

class CurrencySwitch extends React.Component {
    static propTypes = {
        currencyCode: PropTypes.string.isRequired,
        currencyIcon: PropTypes.string.isRequired,
        switchCurrency: PropTypes.func.isRequired
    };

    render() {
        return (
            <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">{this.props.currencyIcon} {this.props.currencyCode}</span>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a onClick={() => this.props.switchCurrency('EUR')} className="dropdown-item">{i18next.t('layout.currencyEUR')}</a>
                    <a onClick={() => this.props.switchCurrency('USD')} className="dropdown-item">{i18next.t('layout.currencyUSD')}</a>
                </div>
            </li>
        );
    }
}

const mapStateToProps = state => {
    const {
        currencyCode,
        currencyIcon,
    } = state.layout.currency;
    return { currencyCode, currencyIcon };
}

const mapDispatchToProps = dispatch => ({
    switchCurrency: (code) => dispatch(switchCurrency(code))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitch);