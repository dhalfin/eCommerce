import React from 'react';
import {Link} from 'react-router-dom';
import * as URL from '../../router/url';
import {withRouter} from 'react-router';
import * as PropTypes from 'prop-types';

AmadoNav.propTypes = {
    location: PropTypes.object,
};

function AmadoNav(props) {
    const {location} = props;

    const menuElements = [
        {
            sectionName: "Home",
            urlAddress: URL.HOME,
        },
        {
            sectionName: "Shop",
            urlAddress: URL.SHOP,
        },
        {
            sectionName: "Product",
            urlAddress: URL.PRODUCT,
        },
        {
            sectionName: "Cart",
            urlAddress: URL.CART,
        },
        {
            sectionName: "Checkout",
            urlAddress: URL.CHECKOUT,
        },
    ];

    return (
        <nav className="amado-nav">
            <ul>
                {
                    menuElements.map((item) => {
                            return (
                                <li key={item.sectionName}
                                    className={location.pathname.includes(item.urlAddress) ? "active" : "false"}>
                                    <Link to={item.urlAddress}
                                    >
                                        {item.sectionName}
                                    </Link>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </nav>
    );
};

export default React.memo(withRouter(AmadoNav));
