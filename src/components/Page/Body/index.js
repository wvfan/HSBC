import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Body extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    wHeader: PropTypes.bool,
  };

  render() {
    const {
      className,
      children,
      style,
      wHeader,
    } = this.props;

    return (
      <div
        className={`absolute-parent body ${wHeader ? 'body-withHeader' : ''} ${className || ''}`}
        style={style}
      >
        {children}
      </div>
    );
  }
}
