import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import lang from 'helpers/decorator/lang';

import Lang from 'components/Lang';

import { styles } from './styles.scss';

import * as dict from './dict.json';

import logoWhite from './images/logo-white.png';
import logo from './images/logo.png';
import appleStore from './images/apple-store.png';
import googlePlay from './images/google-play.png';

@lang(dict)
export default class Home extends React.Component {

  static propTypes = {
    pos: PropTypes.number,
    screenWidth: PropTypes.number,
    wPhone: PropTypes.bool,
  };

  constructor() {
    super();
    this.wShow = false;
    this.wWord1Show = false;
    this.wWord2Show = false;
  }

  componentWillReceiveProps(props) {
    if (props.pos > -1 && props.pos < 1) {
      this.wShow = true;
    }
  }

  render() {
    const {
      pos,
      wPhone,
      screenWidth,
    } = this.props;

    const movesSize = document.body.offsetWidth * 0.7 + 300;
    const wWrap = screenWidth < 1120;

    return (
      <div className={`subpage ${styles}`}>
        {this.wShow ?
          <div className="content">
            <div
              className="moves"
              style={{
                width: `${movesSize}px`,
                height: `${movesSize}px`,
                left: `${document.body.offsetWidth * 0.52 - movesSize / 2}px`,
                top: `${document.body.offsetHeight * 0.52 - movesSize / 2}px`,
              }}
            >
              <div className="circle3">
                <div className="color" />
                <div className="color color2" />
                <div className="cover" />
              </div>
              <div className="circle2">
                <div className="color" />
                <div className="cover" />
              </div>
              <div className="circle1">
                <div className="color" />
              </div>
              <div className="center">
                <div className="inner">
                  <img src={logoWhite} />
                </div>
              </div>
            </div>
            <div className="color" />
            <div
              className="body"
              ref={(ref) => {
                if (!ref) return;
                if (wPhone) {
                  ref.style.marginTop = 'calc(50vh - 45vw)';
                } else {
                  ref.style.marginTop = '';
                }
              }}
            >
              <div className="logo">
                <img src={logo} />
              </div>
              <div className="word">
                <div
                  className={`word1 ${wPhone ? 'word1-phone' : ''}`}
                  ref={(ref) => {
                    if (!ref) return;
                    if (wWrap) {
                      ref.style.right = `calc(50% - ${ref.offsetWidth / 2}px)`;
                    } else {
                      if (!wWrap && this.wWord2Show) {
                        ref.style.right = 'calc(50% + 15px)';
                        ref.style.top = '0px';
                      }
                    }
                    if (this.wWord1Show) return;
                    this.wWord1Show = true;
                    if (!wWrap) {
                      ref.style.right = `calc(50% - ${ref.offsetWidth / 2}px)`;
                    } else {
                      ref.style.top = '6vw';
                    }
                    setTimeout(() => {
                      if (!wWrap) {
                        ref.style.right = 'calc(50% + 15px)';
                      } else {
                        ref.style.top = '0px';
                      }
                    }, 2000);
                  }}
                >
                  <Lang> Want to eat together?</Lang>
                </div>
                <div
                  className={`word2 ${wPhone ? 'word2-phone' : ''}`}
                  ref={(ref) => {
                    if (!ref) return;
                    if (wWrap) {
                      ref.style.left = `calc(50% - ${ref.offsetWidth / 2}px)`;
                      ref.style.top = `${ref.offsetHeight}px`;
                    } else {
                      if (!wWrap && this.wWord2Show) {
                        ref.style.left = '50%';
                        ref.style.top = '0px';
                      }
                    }
                    if (this.wWord2Show) return;
                    this.wWord2Show = true;
                    if (!wWrap) {
                      ref.style.left = `calc(50% - ${ref.offsetWidth / 2}px)`;
                    } else {
                      ref.style.top = `${ref.offsetHeight / 2}px`;
                    }
                    setTimeout(() => {
                      if (!wWrap) {
                        ref.style.left = '50%';
                      } else {
                        ref.style.top = `${ref.offsetHeight}px`;
                      }
                    }, 2000);
                  }}
                >
                  <Lang> Download FooPar now!</Lang>
                </div>
                <div className={`google ${wPhone ? 'google-phone' : ''} ${!wPhone && wWrap ? 'google-wrap' : ''}`}>
                  <img src={googlePlay} />
                </div>
                <div className={`apple ${wPhone ? 'apple-phone' : ''} ${!wPhone && wWrap ? 'apple-wrap' : ''}`}>
                  <img src={appleStore} />
                </div>
              </div>
            </div>
          </div>
          : ''
        }
      </div>
    );
  }
}
