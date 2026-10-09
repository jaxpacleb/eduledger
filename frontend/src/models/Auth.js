import axios from 'axios'

export const UserModel = {
    async login(username, password) {

        try {
            const res = await axios.post('http://localhost:5000/login', {
                username: username,
                password: password
            })

            return res.data;


        } catch (error) {

            const { message } = error.response.data

            /*        if (error.response) {
                    } */
        }
    }
}