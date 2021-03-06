import axios from 'axios';
import { authConfig, baseUrl, getLogger, withLogs } from '../core';
import { Movie } from './Movies';

const itemUrl = `http://${baseUrl}/api/item`;

export const getItems: (token: string, page: number) => Promise<Movie[]> = (token, page) => {
  return withLogs(axios.get(`${itemUrl}?page=${page}`, authConfig(token)), 'getItems');
}

export const createItem: (token: string, item: Movie) => Promise<Movie[]> = (token, item) => {
  return withLogs(axios.post(itemUrl, item, authConfig(token)), 'createItem');
}

export const updateItem: (token: string, item: Movie) => Promise<Movie[]> = (token, item) => {
  return withLogs(axios.put(`${itemUrl}/${item._id}`, item, authConfig(token)), 'updateItem');
}

interface MessageData {
  type: string;
  payload: Movie;
}

const log = getLogger('ws');

export const newWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
  const ws = new WebSocket(`ws://${baseUrl}`);
  ws.onopen = () => {
    log('web socket onopen');
    ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
  };
  ws.onclose = () => {
    log('web socket onclose');
  };
  ws.onerror = error => {
    log('web socket onerror', error);
  };
  ws.onmessage = messageEvent => {
    log('web socket onmessage');
    onMessage(JSON.parse(messageEvent.data));
  };
  return () => {
    ws.close();
  }
}
