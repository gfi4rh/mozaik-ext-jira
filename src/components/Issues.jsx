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
        console.log(issues)
        this.setState({
            issues : issues
        });
    }

    render() {

        return (
            <div>
                Hello
            </div>
        );
    }
}

Issues.displayName = 'Issues';

/*Issues.propTypes = {
    board:  PropTypes.number.isRequired
};*/

reactMixin(Issues.prototype, ListenerMixin);
reactMixin(Issues.prototype, Mozaik.Mixin.ApiConsumer);

export default Issues;
