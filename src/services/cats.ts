import axios from 'axios';

const BASE_PATH = 'https://api.thecatapi.com/v1';

export const getBreeds = (): Promise<any> =>
    axios.get(BASE_PATH + '/breeds');


export const searchBreedImage = (breed_id: string, page: number): Promise<any> =>
    axios.get(BASE_PATH + `/images/search?page=${page}&limit=10&breed_id=${breed_id}`);

export const getBreedDetails = (breed_id: string): Promise<any> =>
    axios.get(BASE_PATH + `/images/${breed_id}`);