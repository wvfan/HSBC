import { constants } from 'reducers/system';

export function update(params) {
  return {
    type: constants.UPDATE,
    payload: params,
  };
}

export function setLang(lang) {
  return update({ lang });
}
