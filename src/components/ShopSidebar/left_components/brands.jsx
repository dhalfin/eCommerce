import React from 'react';
import Spinner from '../../spinner';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {uploadDataToStore, loadNumerator} from '../../../store/action_creatores';

ColumnBrands.propTypes = {
    brands: PropTypes.array,
    brandsLoading: PropTypes.bool,
    uploadDataToStore: PropTypes.func,
};

function ColumnBrands(props) {

    function brandHandler(e) {
        props.loadNumerator("0");
        if (e.target.getAttribute("ident") === "ALL") {
            props.uploadDataToStore("catalog");
        } else {
            props.uploadDataToStore("catalog", `?brand=${e.target.getAttribute("ident")}`);
        }
    }

    function brandsCheckboxGenerator() {

        if (props.brandsLoading) {
            return (<Spinner/>);
        };

        return props.brands.map((item) => {

            return (
                <div className="form-check"
                     key={item.id}
                >
                    <input
                        onChange={brandHandler}
                        className="form-check-input"
                        type="radio"
                        name="brandFilter"
                        id={item.id}
                        title={item.title}
                        defaultChecked={false}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={item.title}>
                        {item.title}
                    </label>
                </div>
            )
        })
    }

    return (
        <div className="widget brands mb-50">
            <h6 className="widget-title mb-30">Brands</h6>

            <div className="widget-desc">

                {/*"ALL" is by default*/}

                <div className="form-check">
                    <input
                        onChange={brandHandler}
                        className="form-check-input"
                        type="radio"
                        name="brandFilter"
                        id="ALL"
                        title="ALL"
                        defaultChecked={true}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="ALL">
                        ALL
                    </label>
                    <br/>
                </div>

                {brandsCheckboxGenerator()}

            </div>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        brands: store.app.brands.data,
        brandsLoading: store.app.isLoading.brands || false,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDataToStore: (actions, key) => dispatch(uploadDataToStore(actions, key)),
        loadNumerator: (string) => dispatch(loadNumerator(string)),
    };
};


export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ColumnBrands));