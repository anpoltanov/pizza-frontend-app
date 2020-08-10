import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import i18next from '../../translations';
import { retrieve, reset } from '../../actions/order/cart';
import { update, reset as editReset } from '../../actions/order/edit';
import { del } from '../../actions/order/delete';

class Edit extends React.Component {
    static propTypes = {
        retrieved: PropTypes.object,
        retrieveLoading: PropTypes.bool.isRequired,
        retrieveError: PropTypes.string,
        updateLoading: PropTypes.bool.isRequired,
        updateError: PropTypes.string,
        deleteLoading: PropTypes.bool.isRequired,
        deleteError: PropTypes.string,
        updated: PropTypes.object,
        deleted: PropTypes.object,
        retrieve: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        del: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        editReset: PropTypes.func.isRequired,
        user: PropTypes.object,
        currencyCode: PropTypes.string.isRequired,
        currencyIcon: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.retrieve(decodeURIComponent(this.props.match.params.id), decodeURIComponent(this.props.match.params.user_id));
    }

    componentWillUnmount() {
        this.props.editReset();
    }

    del = () => {
        if (window.confirm('Are you sure you want to cancel this order?'))
            this.props.del(this.props.retrieved);
    };

    render() {
        if (this.props.deleted) {
            return <Redirect to=".." />;
        }
        const item = this.props.retrieved;
        let subtotal = 0;
        const orderItems = item && item.orderItems;
        return (
            <>
                {(this.props.retrieveLoading ||
                    this.props.updateLoading ||
                    this.props.deleteLoading) && (
                    <div className="alert alert-info" role="status">
                        Loading...
                    </div>
                )}
                {this.props.updated && (
                    <div className="alert alert-success" role="status">
                        {i18next.t('order.placed')}
                    </div>
                )}
                {this.props.retrieveError && (
                    <div className="alert alert-danger" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                        {this.props.retrieveError}
                    </div>
                )}
                {this.props.updateError && (
                    <div className="alert alert-danger" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                        {this.props.updateError}
                    </div>
                )}
                {this.props.deleteError && (
                    <div className="alert alert-danger" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                        {this.props.deleteError}
                    </div>
                )}
                {item && (
                    <>
                        <ul className="list-group mb-3">
                            {orderItems && orderItems.map(item => {
                                subtotal += this.props.currencyCode === 'EUR' ? item.product.priceEUR : item.product.priceUSD;
                                return (<li key={item.id} className="list-group-item">{item.product.name} {this.props.currencyIcon}{this.props.currencyCode === 'EUR' ? item.product.priceEUR : item.product.priceUSD}</li>);
                            })}
                            <li className="list-group-item">Delivery: {this.props.currencyIcon}{this.props.currencyCode === 'EUR' ? '2.00' : '2.50'}</li>
                            <li className="list-group-item active">Total: {this.props.currencyIcon}{subtotal + (this.props.currencyCode === 'EUR' ? 2 : 2.5)}</li>
                        </ul>
                        <form onSubmit={function(e) {
                                this.handleSubmit(e);
                            }.bind(this)}>
                            {this.renderField({
                                name:"deliveryAddress",
                                title: i18next.t('order.deliveryAddress'),
                                type: "text",
                                placeholder: ""
                            })}
                            {this.renderField({
                                name:"comment",
                                title: i18next.t('order.comment'),
                                type: "text",
                                placeholder: ""
                            })}
                            <button type="submit" className="btn btn-success">
                                {i18next.t('common.submit')}
                            </button>
                        </form>
                        <button onClick={this.del} className="btn btn-danger">{i18next.t('order.reset')}</button>
                    </>
                )}
            </>
        );
    }

    renderField = data => {
        return (
            <div className={`form-group row`}>
                <label
                    htmlFor={`form_${data.name}`}
                    className="form-control-label col-sm-2"
                >
                    {data.title}
                </label>
                <input
                    name={data.name}
                    type={data.type}
                    className="form-control col-sm-10"
                    required={data.required}
                    placeholder={data.placeholder}
                    id={`form_${data.name}`}
                />
            </div>
        );
    };

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        this.props.update(this.props.retrieved.id, decodeURIComponent(this.props.user.id), data);
    }
}

const mapStateToProps = state => ({
    retrieved: state.order.edit.retrieved,
    retrieveError: state.order.edit.retrieveError,
    retrieveLoading: state.order.edit.retrieveLoading,
    updateError: state.order.edit.updateError,
    updateLoading: state.order.edit.updateLoading,
    deleteError: state.order.del.error,
    deleteLoading: state.order.del.loading,
    eventSource: state.order.edit.eventSource,
    deleted: state.order.del.deleted,
    updated: state.order.edit.updated,
    user: state.user.login.user,
    currencyCode: state.layout.currency.currencyCode,
    currencyIcon: state.layout.currency.currencyIcon
});

const mapDispatchToProps = dispatch => ({
    retrieve: (id, user_id) => dispatch(retrieve('users/' + user_id + '/orders/' + id)),
    update: (id, user_id, values) => {
        dispatch(update('users/' + user_id + '/orders/' + id, values))
    },
    del: item => dispatch(del(item)),
    reset: () => dispatch(reset()),
    editReset: () => dispatch(editReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
