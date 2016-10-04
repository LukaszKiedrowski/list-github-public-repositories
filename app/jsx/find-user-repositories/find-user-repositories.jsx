import React from 'react';
import {debounce} from 'throttle-debounce';
import RepositoriesList from './repositories-list.jsx';

export default class FindUserRepositories extends React.Component {
    constructor() {
        super();

        this.state = {
            debounceTime: 700,
            userName: ''
        };

        this.updateRepositoriesList = debounce(this.state.debounceTime, this.updateRepositoriesList);
    }

    isUserClearHtmlInput(userName) {
        if(userName === '') {
            return true;
        }

        return false;
    }

    findRepositoriesForUser(e) {
        this.updateRepositoriesList(e.target.value);
    }

    updateRepositoriesList(userName) {
        if(this.isUserClearHtmlInput(userName) === true) {
            return;
        }

        //call componentWillReceiveProps of RepositoriesList
        this.setState({
            userName: userName
        });
    }

    render() {
        return <div className="find-user-repositories">
        <style>
        {`
            .find-user-repositories {
                margin: 10px;
                border-radius: 5px;
                border: 1px solid #ddd;
                min-width: 800px;
            }

            .find-user-repositories input {
                display: block;
                margin: 10px 0px 0px 10px;
                width: 250px;
            }

            .custom-hr {
                width: 100%;
                height: 1px;
                margin: 10px 0px 0px 0px;
                background-color: #ddd;
            }

            .repositories-list-container {
                margin: 0px 10px;
                min-height: 20px;
            }
        `}
        </style>
            <input type="search" onChange={this.findRepositoriesForUser.bind(this)} placeholder="Enter github username..."></input>
            <div className="custom-hr"></div>
            <div className="repositories-list-container">
                <RepositoriesList userName={this.state.userName}></RepositoriesList>
            </div>
        </div>
    }
}