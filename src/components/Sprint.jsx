import React, { Component, PropTypes } from 'react';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment                          from 'moment';
import Mozaik                          from 'mozaik/browser';


class Sprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repository: null
        };
    }

    getApiRequest() {

        let { board } = this.props;

        return {
            id:     `jira.sprint.${board}`,
            params : {}
        };
    }

    onApiData(data) {
        console.log(data);
        /*this.setState({
            repository: repository
        });*/
    }

    render() {


        var cssClasses = '';
        var infoNode   = null;

        if (this.state.repository) {

            var statusClass = '';
            if (this.state.repository.last_build_state === 'passed') {
                statusClass = 'fa fa-check txt--success';
            } else if (this.state.repository.last_build_state === 'started') {
                statusClass = 'fa fa-play-circle-o';
            }

            infoNode = (
                <div>
                    <div className="travis__repository__description">{this.state.repository.description}</div>
                    <ul className="list list--compact">
                        <li className="list__item">
                            <i className={statusClass} /> last build&nbsp;
                            <span className="prop__value">{this.state.repository.last_build_state}</span>
                        </li>
                        <li className="list__item">
                            <i className="fa fa-clock-o" />&nbsp;
                            last build <span className="prop__value">{moment(this.state.repository.last_build_started_at).fromNow()}</span>&nbsp;
                            in <span className="count">{this.state.repository.last_build_duration}s</span>
                        </li>
                        <li className="list__item">
                            <i className="fa fa-code" /> language:&nbsp;
                            <span className="prop__value">{this.state.repository.github_language}</span>
                        </li>
                    </ul>
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
                        {this.state.repository ? `#${this.state.repository.last_build_number}` : '8'}
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
