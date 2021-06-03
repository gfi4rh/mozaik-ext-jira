import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment from 'moment';
import { betweenBusinessDays, hoursLeft } from './util'

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
        let { board, url } = this.props;

        return {
            id:     `jira.sprint.${ board }`,
            params: {
                board: board,
                url : url
            }
        };
    }

    onApiData(sprint) {
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
        const { board, project } = this.props;

        let bodyNode = <div className="widget__body"/>

        if(sprint && sprint.state == 'active'){

            let toStringStart = sprint.startDate.toLocaleDateString();
            let nodOrigin  =  betweenBusinessDays(moment(sprint.startDate), moment(sprint.endDate))+1
            let numOfDays = betweenBusinessDays(moment(), moment(sprint.endDate))
            let hours = hoursLeft();

            bodyNode = (
                <div className="widget__body" onClik={e => window.open("https://delivery.gfi.fr/jira/secure/RapidBoard.jspa?rapidView="+board)}>
                    <div className="jira__sprint__startdate jira__sprint__line jira__sprint__text">
                        {toStringStart}
                    </div>
                    <div className="jira__sprint__line">
                        <div style={{paddingLeft:'2vmin'}}>
                            Ticket :
                        </div>
                        <div>
                            <Issues sprint={sprint.id} project={project}/>
                        </div>
                    </div>
                    <div className="jira__sprint__line">
                        <div className="jira__sprint__text">
                            {`${numOfDays == 0 ? '':`${numOfDays} j`} ${hours == 0 ? '' :`${hours} h`} `}
                        </div>
                        <div>
                            <ProgressBar completed={(nodOrigin-numOfDays)*100/nodOrigin} color={'#161824'} height={'0.3em'}/>
                        </div>
                    </div>

                </div>
            );
        } else {
            bodyNode = (
                <div className="widget__body">
                    <div className="jira__sprint__nodata">Sprint en cours de création ...</div>
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
                        {sprint != null && `#${sprint.name.split('-')[2]}`}
                    </span>
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
