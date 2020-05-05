import React from 'react';
import {connect} from 'react-redux';
import Spinner from "../components/spinner";
import {Link} from 'react-router-dom';
import * as URL from '../router/url';
import * as PropTypes from 'prop-types';
import {
    uploadDataToStore,
    activeCarouselChanger,
    updateCart,
    updateSum,
    itemMemoryChecker
} from '../store/action_creatores';
import Demo from '../components/Ranking/rating';
import Feedback from "../components/Ranking/feedback";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


Product.propTypes = {
    catalog: PropTypes.array,
    categories: PropTypes.array,
    match: PropTypes.object,
    catalogLoading: PropTypes.bool,
    imageItemLoading: PropTypes.bool,
    reviewItemLoading: PropTypes.bool,
    categoriesLoading: PropTypes.bool,
    singleImageItem: PropTypes.array,
    singleReviewItem: PropTypes.array,
    uploadDataToStore: PropTypes.func,
    activeCarouselChanger: PropTypes.func,
    activeImg: PropTypes.number,
    itemMemory: PropTypes.string,
    itemMemoryChecker: PropTypes.func,
    cart: PropTypes.array,
    sum: PropTypes.number,
    updateCart: PropTypes.func,
    updateSum: PropTypes.func,
};

function Product(props) { // we return the description of a SINGLE product when you click on the product image in shop

    const {
        catalog,
        categories,
        match,
        catalogLoading,
        imageItemLoading,
        reviewItemLoading,
        categoriesLoading,
        singleImageItem,
        singleReviewItem,
        uploadDataToStore,
        activeCarouselChanger,
        activeImg,
        itemMemory,
        itemMemoryChecker,
        cart,
        sum,
        updateCart,
        updateSum,
    } = props;

    let item = {};
    let catName;
    let cartItemBayStatus = "ADD TO CART";

    if (singleImageItem === undefined || itemMemory !== match.params.code) {
        itemMemoryChecker(match.params.code)
        uploadDataToStore("imageItem", `?cid=${match.params.code}`);
    }
    ;

    if (singleReviewItem === undefined || itemMemory !== match.params.code) {
        itemMemoryChecker(match.params.code)
        uploadDataToStore("reviewItem", `?cid=${match.params.code}`);
    }
    ;

    if (imageItemLoading || catalogLoading || reviewItemLoading || categoriesLoading) {
        return (<Spinner/>);
    }
    ;

    if (!catalog.find(elem => elem.id === match.params.code)) {
        return (
            <h6 style={{
                margin: "50px",
                padding: "5px",
                color: "red",
                border: "solid red 2px",
                borderRadius: "5px",
                height: "fit-content",
            }}>Error! <br/>
                The product is missing! <br/>
            </h6>
        );
    }
    ;

    if (catalog && catalog.length) {
        for (let i = 0; i < catalog.length; i++) {
            if (catalog[i].id === match.params.code) {
                item = catalog[i];
                let crutch = catalog[i].category;
                let cat = categories.find(element => element.id === crutch);
                catName = cat.title;
            }
            ;
        }
        ;
    }
    ;

    function carouselItemRender() {
        if (singleImageItem && singleImageItem.length) {
            return singleImageItem.map((item, index) => {
                return (
                    <li className={index === activeImg ? "active" : ""} data-target="#product_details_slider"
                        data-slide-to="0"
                        style={{backgroundImage: `http://test-api.ipromote.ru/img/${item.img_url}`}}
                        key={item.id}
                    >
                        <img
                            className="d-block"
                            src={`http://test-api.ipromote.ru/img/${item.url}`}
                            alt="First slide"
                            onClick={() => activeCarouselChanger(index)}
                            style={{
                                height: "100%",
                                margin: "auto"
                            }}
                        />
                    </li>
                );
            })
        }
        ;
    };

    function singleItemRender() {
        if (singleImageItem && singleImageItem.length) {
            let item = singleImageItem[activeImg];
            return (
                <img className="d-block w-100"
                     src={`http://test-api.ipromote.ru/img/${item.url}`}
                     alt="First slide"/>
            );
        } else {
            return (
                <>IMAGE LOADING ERROR</>
            )
        }
        ;
    };

    function reviewRender() { // генерируем отзывы
        if (singleReviewItem && singleReviewItem.length) {
            return singleReviewItem.map((item) => {
                return (
                    <div
                        className="short_overview my-5"
                        key={item.id}>
                        <p>{item.user}</p>
                        <p>{item.title}</p>
                    </div>
                );
            });
        } else {
            return (
                <div className="short_overview my-5">
                    <p>Please leave your feedback here and get a 5% discount on 1 of our great products.</p>
                </div>
            );
        }
        ;
    };

    function handleAddToCart(e) {
        if (!cart.find(elem => elem.item === e.target.name)) {
            cart.push({item: e.target.name, amount: 1});
            updateCart(cart);
            updateSum(Number(e.target.getAttribute("price")) + Number(sum));
            localStorage.setItem(`cartInfo`, JSON.stringify(cart));
        }
        ;
    };

    for (let i = 0; i < cart.length; i++) {
        if (cart.find(elem => elem.item === item.id)) {
            cartItemBayStatus = "ADDED 🤩";
        }
        ;
    }
    ;


    return (
        <div className="single-product-area section-padding-100 clearfix">
            <div className="container-fluid">

                {/* BREAD CRUMBS */}

                {/*<div className="row">*/}
                {/*    <div className="col-12">*/}
                {/*        <nav aria-label="breadcrumb">*/}
                {/*            <ol className="breadcrumb mt-50">*/}
                {/*                <li className="breadcrumb-item"><Link to={URL.HOME}>HOME</Link></li>*/}
                {/*                <li className="breadcrumb-item"><Link to={URL.SHOP}>SHOP</Link></li>*/}
                {/*                <li className="breadcrumb-item"><Link to={`${URL.PRODUCT}/${item.category}`}>{catName}</Link></li>*/}
                {/*                <li className="breadcrumb-item active" aria-current="page">{item.title}</li>*/}
                {/*            </ol>*/}
                {/*        </nav>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="row">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mt-50">
                                <Breadcrumb>
                                    <Breadcrumb.Item href={`${URL.HOME}`}>HOME</Breadcrumb.Item>
                                    <Breadcrumb.Item href={`${URL.SHOP}`}>SHOP</Breadcrumb.Item>
                                    <Breadcrumb.Item
                                        href={`${URL.PRODUCT}/${item.category}`}>{catName}</Breadcrumb.Item>
                                    <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
                                </Breadcrumb>
                            </ol>
                        </nav>
                    </div>
                </div>



                {/* CAROUSEL */}

                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="single_product_thumb">
                            <div id="product_details_slider" className="carousel slide" data-ride="carousel">

                                <ol className="carousel-indicators">
                                    {carouselItemRender()}
                                </ol>

                                <div className="carousel-inner">
                                    <div className="carousel-item active"
                                         style={{height: "100%"}}
                                    >
                                        {singleItemRender()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT DESCRIPTION */}

                    <div className="col-12 col-lg-5">
                        <div className="single_product_desc">

                            <div className="product-meta-data">
                                <div className="line"></div>
                                <p className="product-price">${item.price}</p>
                                <h6>{item.title}</h6>

                                <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                    {/*<div className="ratings">*/}
                                    {/*    <i className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*    <i className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*    <i className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*    <i className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*    <i className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*</div>*/}
                                    <Demo/>
                                </div>

                                <p className="availability"><i className="fa fa-circle"></i> In Stock {item.available}
                                </p>
                            </div>

                            <br/>
                            <br/>
                            {/*<br />*/}

                            <p>Author: Dinar Khalfin</p>
                            <p>Khalfin used this very unusual looking commodity in at least three interiors. The most
                                admired one is the
                                Villa Müller in Prague, where he placed two pieces in the living room just in front of
                                the fireplace.
                                Khalfin is not the author of this design; it is rather a modification of a couch that
                                was produced by the
                                English company Hamptons as far back as the end of the 19th century.</p>

                            <form className="cart clearfix">
                                <button
                                    className="btn amado-btn"
                                    name={item.id}
                                    onClick={(e) => {
                                        handleAddToCart(e)
                                    }}
                                >
                                    {
                                        cartItemBayStatus
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div>
                    <h5>CUSTOMER REVIEWS:</h5>
                    {reviewRender()}
                    <Feedback/>
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        catalog: store.app.catalog.data,
        categories: store.app.categories.data,
        catalogLoading: store.app.isLoading.catalog || false,
        imageItemLoading: store.app.isLoading.imageItem || false,
        reviewItemLoading: store.app.isLoading.reviewItem || false,
        categoriesLoading: store.app.isLoading.categories || false,
        singleImageItem: store.app.singleImageItem.data,
        singleReviewItem: store.app.singleReviewItem.data,
        activeImg: store.app.activeImg,
        itemMemory: store.app.itemMemory,
        cart: store.app.cart,
        sum: store.app.sum,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDataToStore: (actions, key) => dispatch(uploadDataToStore(actions, key)),
        activeCarouselChanger: (number) => dispatch(activeCarouselChanger(number)),
        updateCart: (array) => dispatch(updateCart(array)),
        updateSum: (number) => dispatch(updateSum(number)),
        itemMemoryChecker: (number) => dispatch(itemMemoryChecker(number)),
    };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Product));