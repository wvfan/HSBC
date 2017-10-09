import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { styles } from './styles.scss';

@connect(
  state => ({
    system: state.system,
  }),
  dispatch => bindActionCreators({

  }, dispatch),
)
export default class App extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    system: PropTypes.object,
  };

  componentWillMount() {
    if (DEBUGMODE) {
      // While testing with browser, automatically set url for MemoryRouter.
      // When running on device, the initial router will be '/'
      const path = window.location.href;
      const index = (path.indexOf('/', 8) + 1) || (path.length + 1);
      this.props.history.replace(path.substr(index - 1));
    }
    window.onDeviceReady(() => {
      alert(2333);
    });
  }

  render() {
    const {
      system,
    } = this.props;

    return (
      <div className={styles}>
        HSBC
      </div>
    );
  }
}
