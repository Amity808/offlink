import axios from "axios";

export default axios.create({
    baseURL:'http://16.16.185.83:80',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    // withCredentials: false
});