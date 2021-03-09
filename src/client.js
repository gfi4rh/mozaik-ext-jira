import fetch from 'node-fetch';
import { encode } from 'base-64';

const client = mozaik => {

    const sprint = ( board ) => {

      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/board/${board.board}/sprint?state=future,active`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
    };

    const issues = ( sprint ) => {
      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/sprint/${sprint.sprint}/issue`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
    }
    
  }

export default client;