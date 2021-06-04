import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
const  { Graphic }                         = Mozaik.Component;

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            error : null
        }
    }

    //appel API avec un filtre jira préenregristrer 
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

    //recuperation du nombre de tickets et de leurs types
    onApiData(data) {

        //si le premier type de ticket contient un erreur, remplir erreur
        //si le premier contient une erreur il s'agit d'une erreur de filtre
        //par conséquent les autres ont aussi l'erreur
        if('errorMessages' in data[0]){
            this.setState({
                error : data[0].errorMessages[0]
            })
        } else {

            //si pas d'erreur on rempli STATE avec le total de ticket pour chaque type
            let format = data.map(e => e.total)

            this.setState({
                data : format
            });
        }

    }

    render() {

        const { data, error } = this.state;
        const { filter, url } = this.props

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

        let bodyNode


        if(data) {
            bodyNode = (
                <div className="widget__body ticket_cursor" onClick={e => window.open(url+"/issues/?filter="+filter)}>
                    {/* utilisation d'un graphe de MOZAIK (librairie chartjs)*/}
                    <Graphic 
                        colors={backgroundColor} 
                        labels={labels}
                        data={data} 
                        height={'0.5em'} 
                        width={'0.5em'} 
                    />
                </div>
            );
        } else {
            bodyNode = (
                <div className="widget__body ticket_nodata ticket_cursor" onClick={e => window.open(url+"/issues/?filter="+filter)}>
                    {/* affichage d'erreur */}
                    {error}
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    {/* somme de tickets */}
                    {!error && <span className="widget__header__count">
                        {data != null && data.reduce((a,b) => a + b)}
                    </span>}
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
