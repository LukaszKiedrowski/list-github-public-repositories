import $ from 'jquery';
import React from 'react';
import Infinite from 'react-infinite';
import RepositoryItem from './repository-item.jsx';
import RepositoriesLoadingIcon from './repositories-loading-icon.jsx';

export default class RepositoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            isLoading: false,
            perPage: 20,
            page: 1,
            userName: '',
            noMoreRepositories: false
        };
        this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    }

    componentWillReceiveProps(props) {
        var initPage = 1;

        this.setState({
            userName: props.userName,
            elements: [],
            page: initPage,
            noMoreRepositories: false
        });
        this.fetchRepositories(props.userName, initPage);
    }

    buildElements(data, keyStartIndex) {
        var elements = [];
        for (var i = 0; i < data.length; i++) {
            elements.push(<RepositoryItem key={i + keyStartIndex} repositoryNumber={i + keyStartIndex + 1} value={data[i].html_url}/>);
        }
        return elements;
    }

    constructUrl(userName, perPage, page) {
        return `https://api.github.com/users/${userName}/repos?per_page=${perPage}&page=${page}`;
    }

    incrementPage() {
        this.setState({
            page: this.state.page + 1
        });
    }

    setUserNotFoundMessage() {
        this.setState({
            isLoading: false,
            elements: [`${this.state.userName} not found`]
        });
    }

    setForbiddenMessage() {
        this.setState({
            isLoading: false,
            elements: this.state.elements.concat([`request is forbidden`])
        });
    }

    setEmptyRepositoriesList() {
        this.setState({
            isLoading: false,
            elements: [`${this.state.userName} have 0 repositories`]
        });
    }

    setLoadingState(loadingState) {
        this.setState({
            isLoading: loadingState
        });
    }

    setNoMoreRepositories() {
        this.setState({
            isLoading: false,
            noMoreRepositories: true
        });
    }

    isListRefreshDisable() {
        return this.state.userName === '' || this.state.elements.length < this.state.perPage || this.state.noMoreRepositories === true;
    }

    fetchRepositories(userName, initPage) {
        var that = this;
        that.setLoadingState(true);
        $.ajax({
            url: that.constructUrl(userName, that.state.perPage, initPage),
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                if(data.length === 0) {
                    if(that.state.page === 1) {
                        that.setEmptyRepositoriesList();
                    } else {
                        that.setNoMoreRepositories();
                    }
                } else {
                    var elements = that.buildElements(data, that.state.elements.length);
                    that.setState({
                        isLoading: false,
                        elements: that.state.elements.concat(elements)
                    });
                }
            },
            error: function(xhr) {
                if(xhr.status === 404) {
                    that.setUserNotFoundMessage();
                } else if(xhr.status === 403) {
                    that.setForbiddenMessage();
                }
            }
        });
    }

    handleInfiniteLoad() {
        if(this.isListRefreshDisable() === true) {
            this.setLoadingState(false);
            return;
        }

        this.incrementPage();
        this.fetchRepositories(this.state.userName, this.state.page);
    }

    render() {
        return <Infinite elementHeight={51}
            containerHeight={window.innerHeight}
            infiniteLoadBeginEdgeOffset={200}
            onInfiniteLoad={this.handleInfiniteLoad}
            loadingSpinnerDelegate={<RepositoriesLoadingIcon />}
            isInfiniteLoading={this.state.isLoading}
            timeScrollStateLastsForAfterUserScrolls={1000}
            useWindowAsScrollContainer={true}
            >
            {this.state.elements}
        </Infinite>
    }
}