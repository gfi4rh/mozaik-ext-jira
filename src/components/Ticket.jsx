import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import { formatData } from './util';
const  { Camembert }                         = Mozaik.Component;

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null
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

        console.log(JSON.stringify(tickets));

        this.setState({
            data : null//formatData(tickets) 
        });
    }

    render() {

        const { data } = this.state;


        let bodyNode = <div className="widget__body"></div>;

        let legend = {
            display: true,
            position: 'bottom',
            labels : {

                boxWidth : 10
            }
        }

        if(data) {
            bodyNode = (
                <div className="widget__body" style={{padding : '0.5em'}}>
                    <Camembert data={data} legend={legend} height={'0.5em'} width={'0.5em'} />
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
                        {data != null && data.datasets[0].data.reduce((a,b) => a + b)}
                    </span>
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
