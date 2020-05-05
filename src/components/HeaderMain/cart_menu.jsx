import React from 'react';
import { connect } from 'react-redux';
import cart from '../../assets/img/core-img/cart.png';
import star from '../../assets/img/core-img/favorites.png';
import magnifier from '../../assets/img/core-img/search.png';
import * as URL from '../../router/url';
import { Link } from 'react-router-dom';
import Search from "../Search/search";

function CartMenu(props) {
    let counter = 0;

    function cartCounter() {

        if (props.cart.length) {
            for (let i = 0; i < props.cart.length; i++) {
                counter += props.cart[i].amount;
            };
            return (<>{counter}</>)
        } else {
            return (<>0</>)
        };
    };

    // function shoot() {
    //     return(
    //         <div className="col">
    //             <Search />
    //         </div>
    //     )
    // }

    return (
        <div className="cart-fav-search mb-100">
            <Link to={URL.CART}><img src={cart} alt="" /> Cart <span>({cartCounter()})</span></Link>
            <a href="https://skyway.capital/forinvestors/?partner_id=269707" className="fav-nav"><img src={star} alt="" />Favourite</a>
            {/*<button className="search-nav"><img src={magnifier} alt="" /> Searcher <span>{shoot()}</span></button>*/}
            {/*<Link to={URL.SHOP}><img src={magnifier} alt="" /> Searcher <span>{shoot()}</span></Link>*/}
            <Link to={URL.SHOP}><img src={magnifier} alt="" />Searcher<Search /></Link>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        cart: store.app.cart,
    };
};

export default React.memo(connect(mapStateToProps)(CartMenu));