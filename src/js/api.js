import axios from "axios";

const API_KEY = '36805938-0e5858f236185e483726e7849';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const default_params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}

export const fetchImages = async (search_word, page = 1, per_page) => {
    if (search_word) {
        const { data } = await axios({
            method: 'GET',
            params: {
                ...default_params,
                q: search_word,
                per_page,
                page
            }
    })
    return data;
    }
}
