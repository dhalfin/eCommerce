import React from 'react';
import CartProduct from '../components/cart/cart_product';
import {
    updateCart,
    updateSum,
    updateOnPageShopFilter,
    uploadDataToStore,
} from '../store/action_creatores';
import { connect } from 'react-redux';
import Spinner from "../components/spinner";
import * as PropTypes from 'prop-types';

CartPage.propTypes = {
    cart: PropTypes.array,
    catalog: PropTypes.array,
    catalogLoading: PropTypes.bool,
    uploadDataToStore: PropTypes.func,
    onShopPage: PropTypes.bool,
    sum: PropTypes.number,
    updateCart: PropTypes.func,
    updateOnPageShopFilter: PropTypes.func,
    updateSum: PropTypes.func,
};

function CartPage(props) {

    const {
        cart,
        catalog,
        catalogLoading,
        uploadDataToStore,
        onShopPage,
        sum,
        updateCart,
        updateOnPageShopFilter,
        updateSum,
    } = props;

    let newSum = sum;

    if (onShopPage) {
            uploadDataToStore("catalog");
            updateOnPageShopFilter(false);
    };

    if (catalogLoading) {
        return (<Spinner />);
    };

    SumCounter(); // вычислять сумму покупок лучше на сервере. А то мало ли, что юзер в локалсторожа запишет. Локалсторож - чисто хомячью для удобства.

    function SumCounter() { // вычисляем сумму всех покупок
        newSum = 0;
        for (let i = 0; i < cart.length; i++) {
            for (let j = 0; j < catalog.length; j++) {
                if (cart[i].item === catalog[j].id) {
                    let curSum = catalog[j].price * cart[i].amount;
                    // newSum = + newSum + curSum;
                    newSum = newSum + curSum;
                };
            };
        };
        updateSum(newSum); // обновляем сумму в state
    };

    const handlerCartQuantity = (operator, ident) => {

        if (operator === "plus") { // увеличиваем количество товара
            let currentItem = catalog.find(elem => elem.id === ident)
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].item === ident) {
                    if (cart[i].amount < Number(currentItem.available)) {
                        cart[i].amount++;
                        updateCart(cart);
                    } else {
                        alert(`There are ${currentItem.available} of these products in warehouse!`);
                    };
                };
            };
        } else { // уменьшаем количество товара
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].item === ident) {
                    if (cart[i].amount > 1) {
                        cart[i].amount--;
                        updateCart(cart);
                    } else {
                        cart.splice(i, 1);
                        updateCart(cart);
                    };
                };
            };
        };
        localStorage.setItem(`cartInfo`, JSON.stringify(cart)); // обновляем локалсторож
    };

    return (
        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 col-lg-8">
                        <div className="cart-title mt-50">
                            <h2>Shopping Cart</h2>
                        </div>
                        <div className="cart-table clearfix">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <CartProduct
                                        cart={cart}
                                        catalog={catalog}
                                        onChange={handlerCartQuantity} />

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* выводим стоимость всех товаров */}
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>${newSum}</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>${sum}</span></li>
                            </ul>
                            <div className="cart-btn mt-100">
                                <a href="cart.html" className="btn amado-btn w-100">Checkout</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        sum: store.app.sum,
        cart: store.app.cart,
        catalog: store.app.catalog.data,
        catalogLoading: store.app.isLoading.catalog || false,
        fuckingCrutch: store.app.fuckingCrutch,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (array) => dispatch(updateCart(array)),
        updateSum: (number) => dispatch(updateSum(number)),
        uploadDataToStore: (actions) => dispatch(uploadDataToStore(actions)),
        updateOnPageShopFilter: (bool) => dispatch(updateOnPageShopFilter(bool)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CartPage));