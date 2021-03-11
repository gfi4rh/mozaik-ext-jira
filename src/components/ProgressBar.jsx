import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProgressBar extends Component {

  componentDidMount() {
    console.log('Component mount')
  }

  shouldComponentUpdate(data){
    console.log('Component update woth :' + data);
  }


  render() {

    const { completed, color, animation, height } = this.props;

    const style = {
      backgroundColor: color,
      width: completed + '%',
      transition: `width ${animation}ms`,
      height: height,
    };

    return (
        <div className="progress-bar_wrapper" style={style}>
        </div>
    );
  }
};

ProgressBar.defaultProps = {
  completed: 10,
  color: '#0BD318',
  animation: 200,
  height: 10
};

ProgressBar.propTypes = {
  completed: PropTypes.number,
  color: PropTypes.string,
  animation: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;