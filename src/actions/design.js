import { constants } from '../reducers/design';

export function update(payload) {
  return {
    type: constants.UPDATE,
    payload,
  };
}

export function fold() {
  return {
    type: constants.FOLD,
  };
}

export function unfold() {
  return {
    type: constants.UNFOLD,
  };
}

export function changeSrc(src) {
  return {
    type: constants.CHANGE_SRC,
    payload: {
      src,
    },
  };
}

export function nextSrc() {
  return {
    type: constants.NEXT_SRC,
  };
}

export function prevSrc() {
  return {
    type: constants.PREV_SRC,
  };
}

export function increaseOpacity(degree) {
  return {
    type: constants.INCREASE_OPACITY,
    payload: {
      degree,
    },
  };
}

export function decreaseOpacity(degree) {
  return {
    type: constants.DECREASE_OPACITY,
    payload: {
      degree,
    },
  };
}
