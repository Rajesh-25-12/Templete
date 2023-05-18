import axios from "axios";
export const getApi = () => (
    axios.create({
        baseURL: "https://ipssapi.techgenzi.com/",
        headers: {
            'Accept': 'application/json'
        }
    })
)
export const liveApi = () => (
    axios.create({
        baseURL: "https://ipssapi.techgenzi.com/",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
)

