import React, { Component, PropTypes } from 'react';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';


class Sprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sprint: null
        };
    }

    getApiRequest() {

        let { board } = this.props;

        return {
            id:     `jira.sprint.${board}`,
            params : {
                board : board 
            }
        };
    }

    onApiData(data) {
        console.log(data);
        this.setState({
            sprint: data
        });
    }

    render() {

        var cssClasses = '';
        var infoNode   = null;

        if (this.state.sprint) {

            infoNode = (
                <div>
                    Hello
                </div>
            );

            cssClasses = `travis__repository--${this.state.repository.last_build_state}`;
        }

        return (
            <div className={cssClasses}>
                <div className="widget__header">
                    <span className="travis__repository__slug">
                        <span className="widget__header__subject">Sprint</span>
                    </span>
                    <span className="widget__header__count">
                        {`#${this.state.sprint.id}`}
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {infoNode}
                </div>
            </div>
        );
    }
}

Sprint.displayName = 'Sprint';

/*Repository.propTypes = {
    owner:      PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired
};

reactMixin(Repository.prototype, ListenerMixin);
reactMixin(Repository.prototype, Mozaik.Mixin.ApiConsumer);*/


export default Sprint;
