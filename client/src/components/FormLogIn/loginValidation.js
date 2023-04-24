import axios from 'axios'
const bcrypt = require('bcryptjs')

const BACK_HOST = 'http://localhost:3001'

const regexPassword = /^(?=.*?[a-z])(?=.*?[0-9]).{6,10}$/ // Password al menos un número


export default async function loginValidation(user) {
    const errors = {}

    try {
        var res = await axios.get(`${BACK_HOST}/user?email=${user.email}`)
        console.log('RES', res);        
            const usuario = res.data[0]

            console.log(usuario);
            console.log(bcrypt.hashSync(user.password, 8));

            if (!regexPassword.test(user.password)) errors.password = 'The password must contain at least one number'
            if (usuario.password !== bcrypt.hashSync(user.password, 8)) errors.password = 'Incorrect password'


    } catch (error) {
        errors.email = error.response.data
    }

    return errors
}