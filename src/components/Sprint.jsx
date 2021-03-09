import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
/*import classNames                      from 'classnames'
import d3                              from 'd3/d3'
import moment                          from 'moment'
import timezone                        from 'moment-timezone'*/


class Sprint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sprint : null
        }
        
    }

    getApiRequest() {
        let { board } = this.props;

        return {
            id:     `api.sprint.${ board }`,
            params: {
                board: board
            }
        };
    }

    onApiData(sprint) {
        console.log(sprint)
        this.setState({
            sprint: sprint
        });
    }

    render() {

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    <span className="widget__header__count">
                        {this.state.sprint === null ? '' : this.state.sprint.values[0].name.split('-')[2]}
                    </span>
                    <i className="fa fa-running" />
                </div>
                <div className="widget__body">
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

Sprint.displayName = 'Sprint';

Sprint.propTypes = {
    board:  PropTypes.number.isRequired
};

reactMixin(Sprint.prototype, ListenerMixin);
reactMixin(Sprint.prototype, Mozaik.Mixin.ApiConsumer);

export default Sprint;
