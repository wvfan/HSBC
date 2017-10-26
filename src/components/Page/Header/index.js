import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import logoFull from 'res/logo-full.png';
import safeguard from 'res/safeguard.png';

import { styles } from './styles.scss';

@withRouter
export default class Header extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    backTo: PropTypes.string,
  };

  render() {
    const {
      className,
      children,
      backTo,
    } = this.props;

    return (
      <div className={`header ${styles} ${className || ''}`}>
        {typeof backTo === 'string' ?
          <div
            className="back"
            onClick={() => {
              this.props.history.goBack(backTo);
            }}
          >&#xe646;</div>
          : ''
        }
        {!children ?
          <div className="default">
            <img
              className="logo"
              src={logoFull}
            />
            <img
              className="safeguard"
              src={safeguard}
            />
          </div>
          : ''
        }
        {children}
      </div>
    );
  }
}
