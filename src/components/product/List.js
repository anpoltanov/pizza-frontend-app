import React, { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import i18next from "../../translations";
import { list } from '../../actions/product/list';

class List extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        eventSource: PropTypes.instanceOf(EventSource),
        deletedItem: PropTypes.object,
        list: PropTypes.func.isRequired
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
                        <div key={this.props.key} className="card">
                            <img src={"/img/product/" + item.imageUrl} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <button className="btn btn-success">{i18next.t('product.order')}</button>
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
    return { retrieved, loading, error };
}

const mapDispatchToProps = dispatch => ({
    list: page => dispatch(list(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);