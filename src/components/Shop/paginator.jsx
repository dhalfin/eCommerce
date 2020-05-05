import React from 'react';
import Spinner from "../spinner";
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import { loadNumerator } from '../../store/action_creatores';

Paginator.propTypes = {
    catalog: PropTypes.array,
    itemCode: PropTypes.string,
    itemsOnPage: PropTypes.string,
    pagination: PropTypes.string,
    loadNumerator: PropTypes.func,
    priceFilter: PropTypes.array,
};

function Paginator(props) {

    const {
        catalog,
        itemCode,
        itemsOnPage,
        pagination,
        priceFilter,
        loadNumerator,
        catalogLoading,
    } = props;

    let allItemCounter = 0;

    if (catalogLoading) {
        return (<Spinner />);
    };

    for (let i = 0; i < catalog.length; i++) {
        if (
            catalog[i].category === itemCode && priceFilter[0] <= catalog[i].price
            && priceFilter[1] >= catalog[i].price
        ) {
            allItemCounter++;
        };
    };

    let pageCount = Math.ceil(allItemCounter / itemsOnPage);

    let pagesNumbersArray = [];
    for (let i = 0; i < pageCount; i++) {
        pagesNumbersArray.push(i + 1);
    };

    function paginatorRender() {

        return pagesNumbersArray.map((item, index) => {
            return (
                <li className={index === Number(pagination) ? "page-item active" : "page-item"}
                key={item}
                >
                    <button className="page-link"
                        name={index}
                        onClick={(e) => { loadNumerator(e.target.getAttribute("name")) }}
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "none",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "40px",
                            padding: "0",
                            textAlign: "center",
                            color: "#242424",
                        }}
                    >
                        {item}
                    </button>
                </li>
            )
        })
    };

    return (
        <div className="row">
            <div className="col-12">
                <nav aria-label="navigation">
                    <ul className="pagination justify-content-end mt-50">
                        {
                            paginatorRender()
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        catalog: store.app.catalog.data,
        pagination: store.app.pagination,
        itemsOnPage: store.app.itemsOnPage,
        priceFilter: store.app.priceFilter,
        catalogLoading: store.app.isLoading.catalog || false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadNumerator: (number) => dispatch(loadNumerator(number)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Paginator));