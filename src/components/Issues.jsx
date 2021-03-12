import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import  sortIssues from './util';
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

        let { newIssues, done, open } = sortIssues(issues, project);

        this.setState({
            issues : newIssues, 
            done : done,
            open : open
        });
    }

    render() {

        const { open, done } = this.state;

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
