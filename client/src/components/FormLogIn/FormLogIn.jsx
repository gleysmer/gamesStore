import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import s from './login.module.css'


export default function FormLogIn() {
    const admin = 'admin'

    const BACK_HOST = 'http://localhost:3001'
    const history = useHistory()

    const navigateTo = (url) => {
        history.push(url)
    }

    function login(user) {
        console.log('SUBMIT LOGIN', user);

        if (user) {
            if (user.rol === admin) {
                swal({
                    title: 'Welcome',
                    text: 'Welcome to Gamers Store',
                    icon: 'success',
                    timer: '2000'
                })
                navigateTo('/admin')
            } else {
                swal({
                    title: 'Welcome',
                    text: 'Welcome to Gamers Store',
                    icon: 'success',
                    timer: '2000'
                })
                navigateTo('/home')

            }
        } else {
            console.log('SUBMIT ERROR', user)
            swal({
                title: 'Error',
                text: 'Incorrect user or password',
                icon: 'error',
                button: 'Accept'
            })
        }
    }

    async function handleLogin(values) {
        try {
            const user = await (await axios.post(`${BACK_HOST}/login`, values)).data
            const session = user.data.dataValues

            const token = user.data.token
            console.log(token)

            window.localStorage.setItem('user_token', JSON.stringify(token))
            window.localStorage.setItem('user_session', JSON.stringify(session))

            login(session)

        } catch (error) {
            const err = error.response.data
            alert(err.msg);
        }
    }

    return (
        <div className={s.container}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={handleLogin}
            >
                <Form className={s.form}>
                    <Field name='email' type='email' className={s.input} placeholder='Email' />

                    <Field name='password' type='password' className={s.input} placeholder='Password' />

                    <button type='submit' className={s.button} style={{ marginTop: '30px' }}>Iniciar sesión</button>

                    <div className={s.or}>
                        <hr style={{ width: '90px' }} />
                        or
                        <hr style={{ width: '90px' }} />
                    </div>

                    <button className={s.button} onClick={() => navigateTo('/register')}>Crear cuenta</button>
                </Form>

            </Formik>
        </div>
    )
}