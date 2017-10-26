import _ from 'lodash';

function requireAll(r) {
  return r.keys().map(r);
}
const images = DEBUGMODE ? requireAll(require.context('../../design/App', false, /\.(png|jpe?g|svg)$/)) : [];

const constants = {
  UPDATE: 'DESIGN_UPDATE',
  FOLD: 'DESIGN_FOLD',
  UNFOLD: 'DESIGN_UNFOLD',
  NEXT_SRC: 'DESIGN_NEXT_SRC',
  PREV_SRC: 'DESIGN_PREV_SRC',
  CHANGE_SRC: 'DESIGN_CHANGE_SRC',
  INCREASE_OPACITY: 'DESIGN_INCREASE_OPACITY',
  DECREASE_OPACITY: 'DESIGN_DECREASE_OPACITY',
};
export default constants;

const initialState = {
  top: 0,
  left: 0,
  wFold: false,
  index: 0,
  src: images[0],
  opacity: 0.5,
};

export function design(state = initialState, action) {
  if (Object.values(constants).indexOf(action.type) !== -1) {
    state = _.cloneDeep(state);
  }

  switch (action.type) {
    case constants.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case constants.FOLD:
      return {
        ...state,
        wFold: true,
      };
    case constants.UNFOLD:
      return {
        ...state,
        wFold: false,
      };
    case constants.CHANGE_SRC:
      return {
        ...state,
        src: action.payload.src,
      };
    case constants.INCREASE_OPACITY:
      return {
        ...state,
        opacity: Math.min(1, state.opacity + action.payload.degree),
      };
    case constants.DECREASE_OPACITY:
      return {
        ...state,
        opacity: Math.max(0, state.opacity - action.payload.degree),
      };
    case constants.NEXT_SRC: {
      const index = (state.index + 1) % images.length;
      return {
        ...state,
        index,
        src: images[index],
      };
    }
    case constants.PREV_SRC: {
      const index = state.index ? state.index - 1 : images.length - 1;
      return {
        ...state,
        index,
        src: images[index],
      };
    }

    default:
      return state;
  }
}
