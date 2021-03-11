import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import Issues from './Issues.jsx';
import moment from 'moment';
import { betweenWithoutWeekend } from './util'


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
            sprint: {
                id : sprint.values[0].id,
                name : sprint.values[0].name,
                startDate : new Date(sprint.values[0].startDate),
                endDate : new Date(sprint.values[0].endDate),
                state : sprint.values[0].state
            }
        });
    }

    render() {


        const { sprint } = this.state;
        const { project } = this.props;

        console.log(sprint)

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    <span className="widget__header__count">
                        {sprint != null && sprint.name.split('-')[2]}
                    </span>
                    <i className="fas fa-running" />
                </div>
                <div className="widget__body">
                    <div>
                        {sprint != null && sprint.startDate.toLocaleDateString()}
                    </div>
                    <div>
                        {sprint != null && <Issues sprint={sprint.id} project={project}/>}
                    </div>
                    <div>
                        {sprint != null && betweenWithoutWeekend(moment(), moment(sprint.endDate), 8)}
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
