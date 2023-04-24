import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useHistory } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions';
import validation from './validation';
import s from './form.module.css'
import swal from 'sweetalert';
export default function FormRegister() {
    const dispatch = useDispatch()
    const [picture, setPicture] = useState('')

    const history = useHistory()

    const navigateTo = (url) => {
        history.push(url)
    }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "game_store");
        await axios
            .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
            .then((response) => setPicture(response.data.secure_url))
    };


    const handleRegister = (values) => {
        let formData = {...values, image: picture}
        console.log(formData);
        dispatch(registerUser(formData))
        swal('User succesfully created')
        navigateTo('/home')
    }


    return (
        <div className={s.container}>
            <h1 className={s.title}>GAMERS STORE</h1>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    image: ''
                }}
                onSubmit={handleRegister}
                validate={validation}
            >
                <Form className={s.form}>

                    <Field name='name' type='text' className={s.input} placeholder='Firstname' />
                    <ErrorMessage name='name' />

                    <Field name='surname' type='text' className={s.input} placeholder='Lastname' />
                    <ErrorMessage name='surname' />

                    <Field name='email' type='email' className={s.input} placeholder='Email' />
                    <ErrorMessage name='email' />

                    <Field name='password' type='password' className={s.input} placeholder='Password' />
                    <ErrorMessage name='password' />

                    <div className={s.profile}>
                        <div className={s.profile_picture} style={{ backgroundImage: `url(${picture})` }}></div>
                        
                        <Field name='image' type='file' onChange={handleImage} className={s.file} />
                    </div>

                    <button type='submit' className={s.button}>Register</button>
                </Form>

            </Formik>
        </div>
    )
}