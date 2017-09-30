import axios from 'axios';

const PHONE_URL = 'https://warm-everglades-19518.herokuapp.com/';
export const FETCH_NUMBERS = 'FETCH_NUMBERS';

export async function fetchPhoneList() {
    const url = PHONE_URL;
    const request = await axios.get(url);
    return {
        type: FETCH_NUMBERS,
        payload: request.data
    }
};