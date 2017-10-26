import * as F from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { styles, stylesHide } from './styles.scss';

import * as actions from '../../actions/design';

@withRouter
@connect(
  state => ({
    ...state.design,
  }),
  dispatch => bindActionCreators({
    ...actions,
  }, dispatch),
)
export default class Design extends React.Component {

  static propTypes = {
    history: PropTypes.object,
    wFold: PropTypes.bool,
    top: PropTypes.number,
    left: PropTypes.number,
    index: PropTypes.number,
    src: PropTypes.string,
    opacity: PropTypes.number,
    update: PropTypes.func,
    fold: PropTypes.func,
    unfold: PropTypes.func,
    changeSrc: PropTypes.func,
    nextSrc: PropTypes.func,
    prevSrc: PropTypes.func,
    increaseOpacity: PropTypes.func,
    decreaseOpacity: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      top: undefined,
      left: undefined,
    };
    this.wMouseDown = false;
    this.mouseX0 = undefined;
    this.mouseY0 = undefined;
  }

  handleTouchStart(evt) {
    this.wMouseDown = true;
    this.mouseX0 = evt.touches[0].clientX;
    this.mouseY0 = evt.touches[0].clientY;
    this.x0 = this.props.left;
    this.y0 = this.props.top;
    this.setState({
      top: this.props.top,
      left: this.props.left,
    });
  }

  handleTouchEnd(evt) {
    this.wMouseDown = false;
    this.props.update({
      top: this.state.top,
      left: this.state.left,
    });
    this.setState({
      top: undefined,
      left: undefined,
    });
  }

  handleTouchMove(evt) {
    if (!this.wMouseDown) return;
    const x = evt.touches[0].clientX - this.mouseX0;
    const y = evt.touches[0].clientY - this.mouseY0;
    const size = 10;
    const xC = this.x0 + x;
    const yC = this.y0 + y;
    if (xC !== this.state.left || yC !== this.state.top) {
      this.setState({
        top: yC,
        left: xC,
      });
    }
  }

  handleMouseWheel(evt) {
    const { deltaY } = evt;
    if (deltaY < 0) this.props.increaseOpacity(0.25);
    if (deltaY > 0) this.props.decreaseOpacity(0.25);
  }

  render() {
    return (
      <div
        className={`${styles} ${this.props.wFold ? stylesHide : ''}`}
        style={{
          top: typeof this.state.top !== 'undefined' ? `${this.state.top}px` : `${this.props.top}px`,
          right: typeof this.state.left !== 'undefined' ? `${-this.state.left}px` : `${-this.props.left}px`,
        }}
        onTouchStart={::this.handleTouchStart}
        onTouchEnd={::this.handleTouchEnd}
        onTouchMove={::this.handleTouchMove}
        onWheel={::this.handleMouseWheel}
        onClick={() => {
          if (this.props.wFold) this.props.unfold();
        }}
      >
        <div
          className="body"
          style={{
            backgroundImage: `url(${this.props.src})`,
            opacity: this.props.opacity,
          }}
        />
        <div
          className={`fold horizon ${this.props.wFold ? 'fold-hide' : ''}`}
          onClick={() => {
            this.props.update({
              left: 0,
            });
          }}
        >&#xe645;</div>
        <div
          className={`fold vertical ${this.props.wFold ? 'fold-hide' : ''}`}
          onClick={() => {
            this.props.update({
              top: 0,
            });
          }}
        >&#xe644;</div>
        <div
          className={`fold center ${this.props.wFold ? 'fold-hide' : ''}`}
          onClick={() => {
            this.props.update({
              left: 0,
              top: 0,
            });
          }}
        >&#xe65f;</div>
        <div
          className={`fold ${this.props.wFold ? 'fold-hide' : ''}`}
          onClick={() => {
            this.props.fold();
          }}
        >&#xe6c6;</div>
        <div
          className={`change next ${this.props.wFold ? 'change-hide' : ''}`}
          onClick={() => {
            this.props.nextSrc();
          }}
        >&#xe618;</div>
        <div
          className={`change prev ${this.props.wFold ? 'change-hide' : ''}`}
          onClick={() => {
            this.props.prevSrc();
          }}
        >&#xe619;</div>
        <input
          className={`${this.props.wFold ? 'hide' : ''}`}
          onBlur={(evt) => {
            this.props.history.replace(evt.target.value);
          }}
        />
      </div>
    );
  }
}
