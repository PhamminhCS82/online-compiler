import axios from "axios"

export let endpoints = {
    'compiler': '/compiler/'
}

export default axios.create({
    baseURL: 'http://localhost:8000/'
})