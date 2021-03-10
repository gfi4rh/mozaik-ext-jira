import fetch from 'node-fetch';
import { encode } from 'base-64';
import chalk from 'chalk';


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
      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/sprint/5725/issue`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + encode(`${process.env.JIRA_USERNAME}:${process.env.JIRA_PASSWORD}`),
          'Accept': 'application/json'
        }
      })
      .then(res => res.json());
    }
  };

  return apiCalls;
}

export default client;