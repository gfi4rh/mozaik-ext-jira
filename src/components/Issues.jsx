import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';

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
        console.log(issues);

        const { project } = this.props

        let newIssues = Object.assign({}, issues);
        newIssues.filter(x => x.key.split('-')[0] === project)


        this.setState({
            issues : newIssues
        });
    }

    render() {

        const { issues } = this.state;

        return (
            <div>
                {issues === null ? '' : issues.length}
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
