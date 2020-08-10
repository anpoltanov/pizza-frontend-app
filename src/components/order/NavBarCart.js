import {connect} from "react-redux";
import PropTypes from "prop-types";
import i18next from "../../translations";
import React from "react";
import {NavLink} from "react-router-dom";
import { retrieve } from '../../actions/order/cart';

class NavBarCart extends React.Component {
    static propTypes = {
        retrieved: PropTypes.object,
        retrieveLoading: PropTypes.bool.isRequired,
        retrieveError: PropTypes.string,
        retrieve: PropTypes.func.isRequired,
        user: PropTypes.object,
        currencyCode: PropTypes.string.isRequired,
        currencyIcon: PropTypes.string.isRequired,
    };

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.user && this.props.user && this.props.user.id && !this.props.retrieved && !this.props.retrieveLoading && !this.props.retrieveError
            && !this.props.updateLoading && !this.props.updateError
        ) {
            this.props.retrieve(this.props.user.id);
        }
    }

    render() {
        let subtotal = 0;
        const orderItems = this.props.retrieved && this.props.retrieved.orderItems;
        return (
            <li className="nav-item dropdown">
                {this.props.loading && (<div className="spinner-border text-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)}
                <NavLink to="/order" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true"
                         aria-expanded="false">
                    <i className="fa fa-shopping-cart mr-1"></i>
                    {i18next.t('layout.menuOrderCart')}
                    {this.props.retrieved && this.props.retrieved.orderItems &&
                        ( <span className="badge badge-pill badge-dark ml-1">{this.props.retrieved.orderItems.length}</span>)}
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="navbarCartDropdown">
                    {!orderItems && (<div className="dropdown-item">{i18next.t('order.cartIsEmpty')}</div>)}
                    {orderItems && orderItems.map(item => {
                        subtotal += this.props.currencyCode === 'EUR' ? item.product.priceEUR : item.product.priceUSD;
                        return (<div key={item.id} className="dropdown-item">{item.product.name} {this.props.currencyIcon}{this.props.currencyCode === 'EUR' ? item.product.priceEUR : item.product.priceUSD}</div>);
                    })}
                    {this.props.user && this.props.retrieved && (
                        <>
                            <div className="dropdown-divider"/>
                            <div className="dropdown-item">
                                Subtotal: {this.props.currencyIcon}{subtotal}
                                <NavLink className="btn btn-success btn-sm ml-2" to={`/users/${this.props.user.id}/orders/edit/${this.props.retrieved.id}`}>{i18next.t('order.placeOrder')}</NavLink>
                            </div>
                        </>
                    )}
                </div>
            </li>
        );
    }
}

const mapStateToProps = state => ({
    retrieved: state.order.cart.retrieved,
    retrieveError: state.order.cart.retrieveError,
    retrieveLoading: state.order.cart.retrieveLoading,
    user: state.user.login.user,
    currencyCode: state.layout.currency.currencyCode,
    currencyIcon: state.layout.currency.currencyIcon
    // created: state.consumer.create.created,
});

const mapDispatchToProps = dispatch => ({
    retrieve: (user_id) => dispatch(retrieve('users/' + user_id + '/orders/cart')),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarCart);