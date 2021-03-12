import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets : null
        }
    }

    getApiRequest() {
        let { filter } = this.props;

        return {
            id:     `jira.ticket.${ filter }`,
            params: {
                filter: filter
            }
        };
    }

    onApiData(tickets) {
        console.log(tickets)
        /*this.setState({
            ticket: 
        });*/
    }

    render() {

        const { tickets } = this.state;

        let bodyNode = <div className="widget__body"/>

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    <i className="fas fa-running" />
                </div>
                  {bodyNode}
            </div>
        );
    }
}

Ticket.displayName = 'Ticket';

Ticket.propTypes = {
    board:  PropTypes.number.isRequired
};

reactMixin(Ticket.prototype, ListenerMixin);
reactMixin(Ticket.prototype, Mozaik.Mixin.ApiConsumer);

export default Ticket;
