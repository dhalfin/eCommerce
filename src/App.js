import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { uploadDataToStore, updateCart } from './store/action_creatores'; // для пропсов
import pageElements from './router/router'; // это все загружаемые страницы из роутера
import Spinner from './components/spinner';
import MobileNav from './components/MobileNav/mobile_nav';
import HeaderMain from './components/HeaderMain/HeaderMain';
import NewsletterMain from './components/NewsletterMain/NewsletterMain';
import FooterMain from './components/FooterMain/FooterMain';
import ScrollToTopBtn from "./components/scroll/scrollToTop";


class App extends React.Component {

    componentDidMount() {

        this.props.uploadDataToStore("catalog");
        this.props.uploadDataToStore("brands");
        this.props.uploadDataToStore("colors");
        this.props.uploadDataToStore("prices");
        this.props.uploadDataToStore("categories");

        if (localStorage.cartInfo === undefined) {
            localStorage.setItem(`cartInfo`, JSON.stringify([])); // if localstorage is empty
        } else {
            this.props.updateCart(JSON.parse(localStorage.getItem('cartInfo'))); // otherwise copy localstorage into the state
        }       
    }

    render() {
        return (
            <BrowserRouter>
                <div className="main-content-wrapper d-flex clearfix">
                    <MobileNav />
                    <HeaderMain />
                    <Suspense fallback={<Spinner />}>
                        { pageElements }
                    </Suspense>
                </div>
                <NewsletterMain />
                <FooterMain />
                <ScrollToTopBtn />
            </BrowserRouter>
        );
    }
};

const mapStateToProps = () => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDataToStore: (actions) => dispatch(uploadDataToStore(actions)),
        updateCart: (cart) => dispatch(updateCart(cart)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
