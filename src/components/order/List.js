import {connect} from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import i18next from "../../translations";
import {list} from "../../actions/order/list";

class List extends React.Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        list: PropTypes.func.isRequired,
        user: PropTypes.object,
        currencyCode: PropTypes.string.isRequired,
        currencyIcon: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.list(decodeURIComponent(this.props.match.params.user_id));
    }

    render() {
        return (
            <div className="card-deck">
                {this.props.loading && (<div className="spinner-border text-center" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)}
                {this.props.retrieved && this.props.retrieved['data'].map(order => {
                    return (
                        <div key={order.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order from {order.sentDateTime}</h5>
                                <p className="card-text">{order.comment}</p>
                                <small>{order.deliveryAddress}</small>
                            </div>
                            <ul className="list-group list-group-flush">
                                {order.orderItems.map(item => {
                                    return (
                                        <li key={item.id} className="list-group-item">{item.product.name} {this.props.currencyIcon}{this.props.currencyCode === 'EUR' ? item.product.priceEUR : item.product.priceUSD}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    retrieved: state.order.list.retrieved,
    retrieveError: state.order.list.retrieveError,
    retrieveLoading: state.order.list.retrieveLoading,
    user: state.user.login.user,
    currencyCode: state.layout.currency.currencyCode,
    currencyIcon: state.layout.currency.currencyIcon
});

const mapDispatchToProps = dispatch => ({
    list: user_id => dispatch(list('users/' + user_id + '/orders')),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);