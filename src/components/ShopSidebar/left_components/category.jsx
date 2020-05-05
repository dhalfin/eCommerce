import React from 'react';
import { Link } from 'react-router-dom';
import * as URL from '../../../router/url';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

ColumnCategory.propTypes = {
    currentCategoryFilter: PropTypes.string,
};

function ColumnCategory(props) {
    const {
        currentCategoryFilter,
    } = props;

    return (
        <div className="widget catagory mb-50">
            <h6 className="widget-title mb-30">Categories</h6>
            <div className="catagories-menu">
                <ul>
                    <li className={currentCategoryFilter === "1" ? "active" : ""}><Link to={`${URL.SHOP}/1`}>Tables</Link></li>
                    <li className={currentCategoryFilter === "2" ? "active" : ""}><Link to={`${URL.SHOP}/2`}>Chairs</Link></li>
                    <li className={currentCategoryFilter === "3" ? "active" : ""}><Link to={`${URL.SHOP}/3`}>Seats</Link></li>
                    <li className={currentCategoryFilter === "4" ? "active" : ""}><Link to={`${URL.SHOP}/4`}>Couches</Link></li>
                    <li className={currentCategoryFilter === "5" ? "active" : ""}><Link to={`${URL.SHOP}/5`}>Lamps</Link></li>
                    <li className={currentCategoryFilter === "5" ? "active" : ""}><Link to={`${URL.SHOP}/6`}>Dressings</Link></li>

                </ul>
            </div>
        </div>
    );
}


const mapStateToProps = (store) => {
    return {
        currentCategoryFilter: store.app.currentCategoryFilter,
    };
};

export default React.memo(connect(mapStateToProps)(ColumnCategory));