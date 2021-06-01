import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import { formatData } from './util';
const  { Graphic }                         = Mozaik.Component;

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null
        }
    }

    getApiRequest() {
        let { filter, url } = this.props;

        return {
            id:     `jira.ticket.${ filter }`,
            params: {
                filter: filter,
                url : url
            }
        };
    }

    onApiData(data) {

        console.log(data)

        this.setState({
            data : data
        });
    }

    render() {

        const { data } = this.state;

        const labels = [
            'Tâche',
            'Evolution',
            'Bogue',
            'Incident'
        ]

        const backgroundColor = [
            '#2980b9',
            '#27ae60',
            '#d35400',
            '#e1b12c'
        ]

        let bodyNode = <div className="widget__body"></div>;


        if(data) {
            bodyNode = (
                <div className="widget__body">
                    <Graphic 
                        colors={backgroundColor} 
                        labels={labels}
                        data={data} 
                        height={'0.5em'} 
                        width={'0.5em'} 
                    />
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
                        {data != null && data.reduce((a,b) => a + b)}
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
