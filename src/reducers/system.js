import _ from 'lodash';

export const constants = {
  UPDATE: 'SYSTEM_UPDATE',
};

const initialState = {
  lang: 'en',
};

export default function system(state = initialState, action) {
  if (Object.values(constants).indexOf(action.type) !== -1) {
    state = _.cloneDeep(state);
  }

  switch (action.type) {
    case constants.UPDATE: {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    }

    default:
      return state;
  }
}
