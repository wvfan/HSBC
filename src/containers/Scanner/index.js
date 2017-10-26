import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import Page from 'components/Page';
import Header from 'components/Page/Header';
import Body from 'components/Page/Body';

import { styles } from './styles.scss';

import ScannerEdge from './images/scanner_edge.png';
import ScannerLine from './images/scanner_line.png';

export default class Scanner extends React.Component {

  static propTypes = {

  };

  componentWillMount() {
    window.onDeviceReady(() => {
      window.QRScanner.show();
      window.QRScanner.scan((err, data) => {
        if (err) return;
        if (data.startsWith('{')) data = JSON.parse(data);
      });
    });
  }

  componentWillUnmount() {
    window.onDeviceReady(() => {
      window.QRScanner.cancelScan();
      window.QRScanner.hide();
    });
  }

  render() {
    return (
      <Page className={styles}>
        <Header backTo="/address" />
        <Body>
          <img
            className="edge"
            src={ScannerEdge}
          />
          <img
            className="line"
            src={ScannerLine}
          />
        </Body>
      </Page>
    );
  }
}
