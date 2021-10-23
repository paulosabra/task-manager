import axios, {Method} from 'axios';

const http = axios.create({baseURL: 'http://localhost:3000/api/', timeout: 3000});

export const executeRequest = (endpoint: string, method: Method, body?: any): any => {
    const headers = {'Content-Type': 'application/json'};
    return http.request({url: endpoint, method: method, data: body ? body : '', headers: headers});
}