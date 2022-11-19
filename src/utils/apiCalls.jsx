import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'http://sports.core.api.espn.com/v2/sports/football/leagues/nfl',
    timeout: 16000,
    headers: { 'Content-Type': 'application/json' }
});

const responseBody = (response) => response.data;

const requests = {
    get: (url) => instance.get(url).then(responseBody),
};

export const ApiCalls = {
    getAllTeamsEndpoints: () => requests.get(`/teams?limit=32`),
    getTeamData: (teamId) => requests.get(`/teams/${teamId}`),
    getTeamEvents: (teamId) => requests.get(`/seasons/2022/teams/${teamId}/events`),
    getDataFromEndpoint: (endpoint) => requests.get(endpoint),
    // getAllEndpoints: (endpoint) => requests.getAll(endpoint),
};