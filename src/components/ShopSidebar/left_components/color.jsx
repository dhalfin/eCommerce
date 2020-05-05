import React from 'react';
import Spinner from '../../spinner';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {
    uploadDataToStore,
    loadNumerator,
    colorFilterUpdater,
} from '../../../store/action_creatores';


function ColumnColor(props) {

    const {
        colors,
        colorsLoading,
        uploadDataToStore,
        currentColorFilter,
        colorFilterUpdater,
        loadNumerator,
    } = props;

    if (colorsLoading) {
        return (<Spinner/>);
    }


    function colorHandler(e) {
        loadNumerator("0");
        if (e.target.getAttribute("name") === "ALL") {
            uploadDataToStore("catalog");
        } else {
            uploadDataToStore("catalog", `?colors=${e.target.getAttribute("name")}`);
        }
        colorFilterUpdater(e.target.getAttribute("name"));
    }

    function colorCheckboxGenerator() {

        return colors.map((item) => {
            return (
                <li
                    key={item.id}
                >
                    <div
                        onClick={colorHandler}
                        name={item.id}
                        style={{
                            backgroundColor: `#${item.color}`,
                            width: "30px",
                            height: "30px",
                            display: "block",
                            borderRadius: "50%",
                            position: "relative",
                            zIndex: "1",
                            boxShadow: "0 0 3px rgba(0, 0, 0, 0.15)",
                            border: `${currentColorFilter === item.id ? "1px solid black" : "none"}`,
                        }}
                    >
                    </div>
                </li>
            )
        })
    }

    return (
        <div className="widget color mb-50">
            <h6 className="widget-title mb-30">Color</h6>

            <div className="widget-desc">
                <div
                    onClick={colorHandler}
                    name="ALL"
                    style={{
                        background: `linear-gradient(90deg, red, yellow, green, blue)`,
                        width: "30px",
                        height: "30px",
                        display: "block",
                        borderRadius: "50%",
                        position: "relative",
                        zIndex: "1",
                        boxShadow: "0 0 3px rgba(0, 0, 0, 0.15)",
                        border: `${currentColorFilter === "ALL" ? "1px solid black" : "none"}`,
                    }}
                >
                </div>
                <br/>
                <ul className="d-flex">
                    {colorCheckboxGenerator()}
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        colors: store.app.colors.data,
        colorsLoading: store.app.isLoading.colors || false,
        currentColorFilter: store.app.currentColorFilter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadDataToStore: (actions, key) => dispatch(uploadDataToStore(actions, key)),
        loadNumerator: (string) => dispatch(loadNumerator(string)),
        colorFilterUpdater: (string) => dispatch(colorFilterUpdater(string)),
    };
};

ColumnColor.propTypes = {
    colors: PropTypes.array,
    colorsLoading: PropTypes.bool,
    uploadDataToStore: PropTypes.func,
    currentColorFilter: PropTypes.string,
    colorFilterUpdater: PropTypes.func,
    paginatorEngine: PropTypes.func,
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ColumnColor));