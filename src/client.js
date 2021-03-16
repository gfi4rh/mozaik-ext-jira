import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';
import moment from 'moment';


const client = mozaik => {

  const apiCalls = {
    sprint( board ) {


      mozaik.logger.info(chalk.yellow(`[jira] calling jira.sprint`));

      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/board/${board.board}/sprint?state=future,active`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
    },

    issues( sprint ) {

      mozaik.logger.info(chalk.yellow(`[jira] calling jira.issues`));

      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/sprint/${sprint.sprint}/issue`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
      .then(res => res.json());
    },

    ticket( filter ) {

      mozaik.logger.info(chalk.yellow(`[jira] calling jira.ticket`));
      let now = moment().year();

      let url = `https://delivery.gfi.fr/jira/rest/api/2/search?maxResults=0&jql=%22Arr%C3%AAt%C3%A9%20de%20versions%22%20in%20(${now -1},${now})%20AND%20filter=${filter.filter}`

      let header = {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      };
      
      let requests = [
        "%20and%20type=%22Bogue%20%20%22",  //Bogue
        "%20and%20type=%22Task%22",        //Tâche
        "%20and%20type=%22Evolution%22",  //Evolution
        "%20and%20type=%22Incident%22"   //Incident
      ].map(type => fetch(url+type, header).then(res => res.json()))

      return Promise.all(requests);
    }
  };

  return apiCalls;
}

export default client;