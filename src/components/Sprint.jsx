import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment from 'moment';
import { betweenBusinessDays } from './util'

import Issues from './Issues.jsx';
const  { ProgressBar }                         = Mozaik.Component;



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

        let bodyNode = <div className="widget__body"/>

        if(sprint && sprint.state == 'active'){

            let toStringStart = sprint.startDate.toLocaleDateString();
            let { numOfDays, hours } = sprint != null && betweenBusinessDays(moment(), moment(sprint.endDate))

            bodyNode = (
                <div className="widget__body">
                    <div>
                        {toStringStart}
                    </div>
                    <div>
                        <Issues sprint={sprint.id} project={project}/>
                    </div>
                    <div>
                        {`${numOfDays == 0 ? '':`${numOfDays} j`} ${hours == 0 ? '' :`${hours} h`} `}
                    </div>
                    <div>
                        <ProgressBar completed={10} color={'#2d3436'}/>
                    </div>

                </div>
            );
        }

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
                {bodyNode}
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
