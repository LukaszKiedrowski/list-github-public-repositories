import React from 'react';
 
export default class LoadingIcon extends React.Component {
    render() {
        return <span className="loading-icon">
            <style>
                {`
                    .loading-icon {
                        border: 1px solid #000;
                        width: 20px;
                        height: 20px;
                        border-radius: 15px;
                        border-left: 0px;
                        border-bottom: 0px;
                        display: inline-block;

                        animation-name: rotate; 
                        animation-duration: 0.5s; 
                        animation-iteration-count: infinite;
                        animation-timing-function: linear;
                    }

                    @keyframes rotate {
                        from {transform: rotate(0deg);}
                        to {transform: rotate(360deg);}
                    }
                `}
            </style>
        </span>
    }
}