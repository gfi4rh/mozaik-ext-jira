import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';
import moment from 'moment';


const client = mozaik => {

  const apiCalls = {
    
    sprint( params ) {


      mozaik.logger.info(chalk.yellow(`[jira] calling jira.sprint`));

      return fetch(`${params.url}/rest/agile/1.0/board/${params.board}/sprint?state=active`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
    },

    issues( params ) {

      mozaik.logger.info(chalk.yellow(`[jira] calling jira.issues`));

      let headers = {
        'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
        'Accept': 'application/json'
      }

      return fetch(`${params.url}/rest/agile/1.0/sprint/${params.sprint}/issue?maxResults=0`,{
        method: 'GET',
        headers: headers
      })
      .then(res => res.json())
      .then(json => fetch(`${params.url}/rest/agile/1.0/sprint/${params.sprint}/issue?maxResults=${json.total}&fields=status`, {
        method: 'GET',
        headers: headers
      }))
      .then(res => res.json())

    },

    ticket( params ) {

      mozaik.logger.info(chalk.yellow(`[jira] calling jira.ticket`));
      let now = moment().year();

      let url = `${params.url}/rest/api/2/search?maxResults=0&jql=%22Arr%C3%AAt%C3%A9%20de%20versions%22%20in%20(${now-1},${now},${now+1})%20AND%20filter=${params.filter}`

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