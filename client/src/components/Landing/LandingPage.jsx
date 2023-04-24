import React from "react";
import { useHistory } from 'react-router-dom'
import TinyCarousel from '../Carousels/TinyCarousel'
import FormLogIn from "../FormLogIn/FormLogIn";
import Auth from "../Auth/Auth";

import image1 from '../../media/landing/landing-1.jpg'
import image2 from '../../media/landing/landing-2.jpg'
import image3 from '../../media/landing/landing-3.jpg'
import image4 from '../../media/landing/landing-4.jpg'
import image5 from '../../media/landing/landing-5.jpg'

import s from './Landing.module.css'


export default function LandingPage() {
    const history = useHistory()
    const navigateTo = (url) => {
        history.push(url)
    }

    const pictureArray = [image1, image2, image3, image4, image5]
    let randomIndex = Math.floor(Math.random() * 5)
    let background = pictureArray[randomIndex]


    return (
        <div className={s.container} style={{ backgroundImage: `url(${background})` }}>
            <div className={s.big}>
                <h1 className={s.title}>GAMERS STORE</h1>
                <TinyCarousel slides={4} speed={1000} />
            </div>

            <div className={s.form}>
                <h1 className={s.title_form}>GAMERS STORE</h1>
                <p className={s.parr}>¡Bienvenido a nuestra tienda de videojuegos! Aquí encontrarás todo lo que necesitas para satisfacer tus necesidades de entretenimiento digital! </p>
                <FormLogIn />
                <div>
                    <Auth />
                    <button className={s.continue} onClick={() => navigateTo('/home')}>Continuar sin Inciar sesión</button>
                </div>
            </div>
        </div>
    )
}