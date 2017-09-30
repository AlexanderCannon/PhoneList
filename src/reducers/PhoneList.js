import { FETCH_NUMBERS } from '../actions/index'

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_NUMBERS:
      const {contacts} = action.payload;
      return [contacts, ...state];
    default:
      return state;
  }
}