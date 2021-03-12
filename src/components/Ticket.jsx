import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import sortType from './util';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task : null,
            bogue : null,
            evolution : null
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

      let data = sortType(tickets);

      this.setState({
          task : data.task,
          bogue : data.bogue,
          evolution : data.evolution
      });
    }

    render() {

        const { task, bogue, evolution } = this.state;

        let bodyNode = (
          <div className="widget__body">
            <div>
              {`Tâche : ${task}`}
            </div>
            <div>
              {`Bogue : ${bogue}`}
            </div>
            <div>
              {`Evolution : ${evolution}`}
            </div>
          </div>
        );

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
