import React from 'react';

export default class RepositoryItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="repository-item">
            <style>
                {`
                    .repository-item {
                        height: 50px;
                        line-height: 50px;
                    }
                `}
            </style>
            <div>
                <a target="_blank" href={this.props.value}>{this.props.repositoryNumber}. {this.props.value}</a>
            </div>
        </div>
    }
}