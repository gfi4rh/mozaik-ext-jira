import Promise from 'bluebird';
import fetch from 'node-fetch';

/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
const client = mozaik => {

  return {


    board({ board }){

      const def = Promise.defer();

      mozaik.logger.info(chalk.yellow(`[jira] calling board: ${board}`));

      fetch(`https://delivery.gfi.fr/jira/rest/agile/1.0/board/${board}`)
        .then(res => res.json())
        .then(json => def.resolve(json.name))
        .catch(err => def.reject(err));

        return def.promise;
    }
  }
}


export default client;