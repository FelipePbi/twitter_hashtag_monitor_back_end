import axios from 'axios';
import secretTwitter from '../configs/SecretApiTwitter';

const twApi = axios.create({
  baseURL: secretTwitter.base_url,
});

twApi.defaults.headers.Authorization = `Bearer ${secretTwitter.bearer_token}`;

export default twApi;
