import axios from 'axios';


const instance = axios.create({
    baseURL: "https://whatsapp-clone-mern123.herokuapp.com/"
});

export default instance;