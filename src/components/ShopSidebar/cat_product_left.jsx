import React from 'react';
import ColumnCategory from './left_components/category';
import ColumnBrands from './left_components/brands';
import ColumnColor from './left_components/color';
import ColumnPrice from './left_components/price';

function ShopSidebar() {

    return (
        <div className="shop_sidebar_area">
            <ColumnCategory />
            <ColumnBrands/>
            <ColumnColor />
            <ColumnPrice />
        </div>
    );
}

export default React.memo(ShopSidebar);