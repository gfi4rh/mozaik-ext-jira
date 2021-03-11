import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
const  { ProgressBar }                         = Mozaik.Component;

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues : null,
            open : null,
            done : null
        }
        
    }

    getApiRequest() {
        let { sprint } = this.props;

        return {
            id:     `jira.issues.${ sprint }`,
            params: {
                sprint : sprint
            }
        };
    }

    onApiData(issues) {

        const { project } = this.props;

        let newIssues = issues.issues
            .filter(x => x.key.split('-')[0] === project)
            .map(issue => { return {
                id : issue.id,
                key : issue.key,
                status : {name : issue.fields.status.name, key : issue.fields.status.statusCategory.key} 
            }});

        let done = newIssues.filter(x => x.status.key === 'done').length

        console.log("done : " + done)
        console.log("open : " + (newIssues.length - done));
        console.log(newIssues);
        this.setState({
            issues : newIssues, 
            done : done,
            open : newIssues.length-done
        });
    }

    render() {

        const { issues, open, done } = this.state;

        return (
            <div>
                <ProgressBar open={open} done={done}/>
            </div>
        );
    }
}

Issues.displayName = 'Issues';

Issues.propTypes = {
    sprint:  PropTypes.number.isRequired
};

reactMixin(Issues.prototype, ListenerMixin);
reactMixin(Issues.prototype, Mozaik.Mixin.ApiConsumer);

export default Issues;
