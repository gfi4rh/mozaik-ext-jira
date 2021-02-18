import Promise from 'bluebird';
import fetch from 'node-fetch';
import { encode } from 'base-64';

/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
const client = mozaik => {
  
  return {

    sprint(board) {

      mozaik.logger.info(chalk.yellow(`[jira] calling board: ${board}`));

      return fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/board/${board}/sprint`, {
        method: 'GET',
        headers: {
          'Authorization' : 'Basic ' + encode(`${process.env[JIRA_USERNAME]}:${process.env[JIRA_PASSORD]}`) ,
          'Accept': 'application/json'
        }
      })
    }
  }
}


export default client;