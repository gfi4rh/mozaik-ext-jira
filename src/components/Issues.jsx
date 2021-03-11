import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
const  { ProgressBar }                         = Mozaik.Component;

class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues : null
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
        console.log(issues.issues);

        const { project } = this.props;

        let newIssues = issues.issues
            .filter(x => x.key.split('-')[0] === project)
            .map(issue => { return {
                id : issue.id,
                key : issue.key,
                status : {name : issue.fields.status.name, key : issue.fields.status.statusCategory.key} 
            }});

        console.log(newIssues);
        this.setState({
            issues : newIssues
        });
    }

    render() {

        const { issues } = this.state;

        return (
            <div>
                <ProgressBar completed={50}/>
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
