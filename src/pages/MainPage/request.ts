import axios from 'axios';

/* eslint-disable-next-line import/prefer-default-export */
export const getPhotoList = async (page: number) => {
  return axios.get(
    `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_CLIENT_ID}&page=${page}&per_page=20`
  );
};

export const searchPhotoList = async (page: number, query: string) => {
  return axios.get(
    `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_CLIENT_ID}&page=${page}&per_page=20&query=${query}`
  );
};
