import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Issues from './Issues.jsx';


class Sprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sprint : null
        }
        
    }

    getApiRequest() {
        let { board } = this.props;

        return {
            id:     `jira.sprint.${ board }`,
            params: {
                board: board
            }
        };
    }


    onApiData(sprint) {
        console.log(sprint)
        this.setState({
            sprint: sprint.values[0]
        });
    }

    render() {

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    <span className="widget__header__count">
                        {this.state.sprint === null ? '' : this.state.sprint.name.split('-')[2]}
                    </span>
                    <i className="fas fa-running" />
                </div>
                <div className="widget__body">
                    <div>
                        <Issues/>
                    </div>
                </div>
            </div>
        );
    }
}

Sprint.displayName = 'Sprint';

Sprint.propTypes = {
    board:  PropTypes.number.isRequired
};

reactMixin(Sprint.prototype, ListenerMixin);
reactMixin(Sprint.prototype, Mozaik.Mixin.ApiConsumer);

export default Sprint;
