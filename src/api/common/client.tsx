import axios from 'axios';
import humps from 'humps';

import { setAuthToken } from '../../core';
import { storage } from '../../core/auth/utils';
import { Env } from '../../core/env';

export const client = axios.create({
  baseURL: Env.API_URL,
});

const ACCESS_TOKEN = 'access-token';
const CLIENT_HEADER = 'client';
const UID_HEADER = 'uid';
const EXPIRY_HEADER = 'expiry';

const CONTENT_TYPE = 'Content-Type';
const MULTIPART_FORM_DATA = 'multipart/form-data';

client.interceptors.request.use(config => {
  const { headers, data } = config;

  const token = storage.getAuthToken();

  if (token) {
    const { access, client: _client, uid } = token;

    headers[ACCESS_TOKEN] = access;
    headers[CLIENT_HEADER] = _client;
    headers[UID_HEADER] = uid;
    headers[EXPIRY_HEADER] = token[EXPIRY_HEADER];
  }

  if (headers && headers[CONTENT_TYPE] !== MULTIPART_FORM_DATA && data) {
    config.data = humps.decamelizeKeys(data);
  }

  return config;
});

client.interceptors.response.use(
  async response => {
    const { data, headers } = response;

    const token = headers[ACCESS_TOKEN];
    const _client = headers[CLIENT_HEADER];
    const uid = headers[UID_HEADER];
    const expiry = headers[EXPIRY_HEADER];

    if (token) {
      setAuthToken({ access: token, client: _client, uid, expiry });
    }

    response.data = humps.camelizeKeys(data);
    return response;
  },
  error => {
    if (error.response?.data) {
      error.response.data = humps.camelizeKeys(error.response.data);
    }

    return Promise.reject(error);
  },
);
