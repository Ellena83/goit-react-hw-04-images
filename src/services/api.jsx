import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
    key: '30765858-fc152abb5827d9103dadc3f2f',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
};

export const fetchImages = async (value, page) => {

    const { data } = await axios.get(`?q=${value}&page=${page}`);
    return data;
}
