import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames                      from 'classnames'
import d3                              from 'd3/d3'
import moment                          from 'moment'
import timezone                        from 'moment-timezone'


class Clock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

Clock.displayName = 'Clock';

Clock.propTypes = {
    title:    PropTypes.string,
    info:     PropTypes.string,
    timezone: PropTypes.string,
    sunRise:  PropTypes.string.isRequired,
    sunSet:   PropTypes.string.isRequired
};




export default Clock;
