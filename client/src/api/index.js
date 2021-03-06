import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);

export const getCharacter = (userId) => API.get(`/character/get/${userId}`);
export const createCharacter = (formData) => API.post('/character/create', formData);
export const updateCharacter = (updatedCharacter) => API.patch('/character/update', updatedCharacter);
export const increaseStatistic = (statistic, value, characterId) => API.patch('/character/statistics/increase', { statistic, value, characterId });

export const getRanking = (page) => API.get(`/ranking/get?page=${page}`);
export const getRankingCharacter = (characterId) => API.get(`/ranking/character/${characterId}`);
export const getRankingByFilter = (filter, page) => API.get(`/ranking/search?page=${page}&nickname=${filter.nickname}&vocation=${filter.vocation}&minlevel=${filter.minLevel}&maxlevel=${filter.maxLevel}`);

export const createMonster = (characterId) => API.post('/arena/create/monster', characterId);
export const getMonsters = (characterId) => API.get(`/arena/get/monsters?characterId=${characterId}`);
export const resetMonsters = (characterId) => API.patch(`/arena/reset/monsters?characterId=${characterId}`);
export const fightMonster = (monsterId) => API.patch(`/arena/fight/monster/${monsterId}`);
