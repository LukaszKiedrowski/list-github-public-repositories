import React from 'react';
import LoadingIcon from '../loading-icon.jsx';

export default class RepositoriesLoadingIcon extends React.Component {
    render() {
        return <div className="repositories-loading-icon">
            <style>
                {`
                    .repositories-loading-icon {
                        margin-left: 49%;
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                `}
            </style>
            <LoadingIcon></LoadingIcon>
        </div>
    }
}