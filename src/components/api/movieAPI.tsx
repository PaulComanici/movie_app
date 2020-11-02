import axios from 'axios'
import {Movie} from "../Movies";

const baseUrl = 'localhost:3000'
const itemUrl = `http://${baseUrl}/movie`

interface ResponseProps<T> {
    data: T;
}

function withLogs<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
    return promise
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getItems: () => Promise<Movie[]> = () => {
    return withLogs(axios.get(itemUrl, config), 'getNames');
}

export const createItem: (item: Movie) => Promise<Movie[]> = item => {
    return withLogs(axios.post(itemUrl, item, config), 'save');
}

export const updateItem: (item: Movie) => Promise<Movie[]> = item => {
    return withLogs(axios.put(`${itemUrl}/${item.id}`, item, config), 'update')
}

interface MessageData {
    event: string,
    payload: {
        item: Movie
    }
}

//TODO add logs
export const newWebSocket = (onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`)
    ws.onopen = () => {
    };
    ws.onclose = () => {
    };
    ws.onerror = error => {
    };
    ws.onmessage = messageEvent => {
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}
