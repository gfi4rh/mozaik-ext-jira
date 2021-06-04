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
            sprint : null,
            error : null
        }
    }

    getApiRequest() { //fonction d'appel d'api MOZAIK
        let { board, url } = this.props;

        return {
            id:     `jira.sprint.${ board }`, //board est un paramètre JIRA
            params: {
                board: board,
                url : url
            }
        };
    }

    onApiData(sprint) { //retour d'api MOZAIK
        
        if('errors' in sprint) { //si erreur dans retour, remplir le champ error de STATE
            this.setState({
                error : sprint.errors.rapidViewId
            })
        } else {
            if(sprint.values.length){ // s'il y a au moins une valeur dans le champ values du retour, remplir le champs sprint de STATE
                this.setState({
                    sprint: {
                        id : sprint.values[0].id,
                        name : sprint.values[0].name,
                        startDate : new Date(sprint.values[0].startDate),
                        endDate : new Date(sprint.values[0].endDate),
                        state : sprint.values[0].state
                    }
                })
            } else { //si pas d'erreur ni de valeur alors pas de sprint actif, repmir le champ erreur de STATE
                this.setState({
                    error : "Pas de sprint actif ..."
                })
            }
        }

    }

    render() {


        const { sprint, error } = this.state;
        const { board, project } = this.props;

        let bodyNode //node par défaut

        if(sprint){

            //calcul du nombre de jour travaillé entre maintenant et la fin du sprint 
            //calcul du nombre d'heures, en comptant 8 heures par jour
            let toStringStart = sprint.startDate.toLocaleDateString();
            let nodOrigin  =  betweenBusinessDays(moment(sprint.startDate), moment(sprint.endDate))+1
            let numOfDays = betweenBusinessDays(moment(), moment(sprint.endDate))
            let hours = hoursLeft();

            bodyNode = (
                <div className="widget__body" onClick={e => window.open("https://delivery.gfi.fr/jira/secure/RapidBoard.jspa?rapidView="+board)}>
                    <div className="jira__sprint__startdate jira__sprint__line jira__sprint__text">
                        {toStringStart}
                    </div>
                    <div className="jira__sprint__line">
                        <div style={{paddingLeft:'2vmin'}}>
                            Ticket :
                        </div>
                        <div>
                            {/*pogress bar pour le nombre d'issues faites et non faites*/}
                            <Issues sprint={sprint.id} project={project}/>
                        </div>
                    </div>
                    <div className="jira__sprint__line">
                        <div className="jira__sprint__text">
                            {/*jours et heures restantes */}
                            {`${numOfDays == 0 ? '':`${numOfDays} j`} ${hours == 0 ? '' :`${hours} h`} `}
                        </div>
                        <div>
                            {/*porgress bar pour le temps passé*/}
                            <ProgressBar completed={(nodOrigin-numOfDays)*100/nodOrigin} color={'#161824'} height={'0.3em'}/>
                        </div>
                    </div>

                </div>
            );
        } else { 
            bodyNode = (
                <div className="widget__body" onClick={e => window.open("https://delivery.gfi.fr/jira/secure/RapidBoard.jspa?rapidView="+board)}>
                    {/* node d'erreur */}
                    <div className="jira__sprint__nodata">{error}</div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    {/* si pas d'erreur somme du nombre total d'issues */}
                    { !error && <span className="widget__header__count">
                        {sprint != null && `#${sprint.name.split('-')[2]}`}
                    </span>}
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
