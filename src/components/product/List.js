import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import i18next from "../../translations";
import { list } from '../../actions/product/list';
import { addItem } from '../../actions/order/cart';

class List extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        list: PropTypes.func.isRequired,
        addItemToCart: PropTypes.func.isRequired,
        currencyCode: PropTypes.string.isRequired,
        currencyIcon: PropTypes.string.isRequired,
    };

    componentDidMount() {
        this.props.list();
    }

    render() {
        return (
            <>
                {this.props.loading && (<div className="spinner-border text-center" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>)}
                <div className="card-columns" id="pizza">
                    {this.props.retrieved &&
                            this.props.retrieved["data"].map(item => {return (
                        <div key={item.id} className="card">
                            <img src={"/img/product/" + item.imageUrl} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{this.props.currencyIcon}{this.props.currencyCode === 'EUR' ? item.priceEUR : item.priceUSD}</p>
                                <button className="btn btn-success" onClick={() => {this.props.addItemToCart(item)}}>{i18next.t('product.order')}</button>
                            </div>
                        </div>
                    )}, this)}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    const {
        retrieved,
        loading,
        error
    } = state.product.list;
    const {
        currencyCode,
        currencyIcon
    } = state.layout.currency;
    return { retrieved, loading, error, currencyCode, currencyIcon };
}

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
    addItemToCart: item => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);