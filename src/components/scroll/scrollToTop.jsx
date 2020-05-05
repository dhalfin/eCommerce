import React, {Component} from "react";

export default class ScrollToTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }

    componentDidMount() {
        let scrollComponent = this;
        document.addEventListener("scroll", function (e) {
            scrollComponent.toggleVisibility();
        });
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const {is_visible} = this.state;
        return (
            <div className="scroll-to-top" style={{ position: 'fixed', right: '7px', bottom: '7px', zIndex: '99999', cursor: 'pointer', border: '0'}}>
                {is_visible && (
                    <div onClick={() => this.scrollToTop()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="46px" height="65px"
                             xmlns="http://www.w3.org/1999/xlink" viewBox="0 0 16.139584 21.166666">
                            <defs>
                                <linearGradient x1="108.479" x2="105.833" y1="-41.667" y2="106.5"
                                                gradientUnits="userSpaceOnUse" href="#a_u"
                                                gradientTransform="matrix(.104 0 0 .104 5.098 266.05)"></linearGradient>
                                <linearGradient id="a_u">
                                    <stop stop-color="#222" offset="0"></stop>
                                    <stop stop-opacity="0" stop-color="#222" offset="1"></stop>
                                </linearGradient>
                            </defs>
                            <g>
                                <g>
                                    <path fill="#d0321e" d="M8.17.24l-3.3 13.72 3.3 7.13 3.3-7.14z"></path>
                                    <path fill="#fa503b" d="M8.17.24L.5 13.54 5.16 13z"></path>
                                    <path fill="#fa503b" d="M8.17.24l7.7 13.3L11.2 13z"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                )}
            </div>
        );
    }
}


