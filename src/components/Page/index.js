import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Header from './Header';
import Body from './Body';

import { styles } from './styles.scss';

const header = <Header />;
const body = <Body />;

console.log(header, body);

export default class Page extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  };

  render() {
    const {
      className,
    } = this.props;
    let children = this.props.children;
    if (!(children instanceof Array)) children = [children];

    let wHeader = false;
    _.each(children, (child) => {
      if (child.type === header.type) {
        wHeader = true;
        return false;
      }
    });

    return (
      <div className={`absolute-parent ${styles} ${className || ''}`}>
        {_.map(children, (child) => {
          if (child.type === body.type) {
            return (
              <Body
                key="body"
                {..._.omit(child.props, ['children'])}
                wHeader={wHeader}
              >
                {child.props.children}
              </Body>
            );
          }
          return child;
        })}
      </div>
    );
  }
}
