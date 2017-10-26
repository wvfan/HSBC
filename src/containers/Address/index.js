import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import Page from 'components/Page';
import Header from 'components/Page/Header';
import Body from 'components/Page/Body';

import * as systemActions from 'actions/system';

import { styles } from './styles.scss';

import img from './images/address.jpg';

@connect(
  state => ({
    user: state.system.user,
  }),
  bindActionCreators({
    ...systemActions,
  }),
)
export default class Address extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
    update: PropTypes.func,
  };

  render() {
    const {
      user,
    } = this.props;

    return (
      <Page className={styles}>
        <Header backTo="" />
        <Body
          style={{
            backgroundImage: `url(${img})`,
          }}
        >
          {!user.addressVerified ?
            <div className="absolute-parent container not-verified">
              <div className="absolute-parent bgColor" />
              <div className="absolute-parent content">
                <div className="type">
                  <div className="fill-space" />
                  <div className="icon">&#xe61b;</div>
                  <div className="word">Address</div>
                  <div className="fill-space" />
                </div>
                <div className="main">You are not verified!</div>
                <div
                  className="button"
                  onClick={() => {
                    this.props.history.push('/scanner');
                  }}
                >
                  VERIFY
                </div>
                <div className="notif">To verify your address, please ensure you have an active mobile network connection.</div>
              </div>
            </div> :
            <div className="absolute-parent container verified">
              <div className="absolute-parent bgColor" />
            </div>
          }
        </Body>
      </Page>
    );
  }
}
