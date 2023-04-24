import { Link } from 'react-router-dom'
import s from './card.module.css'

export default function Card({ id, name, image, price }) {
    return (
        <Link to={`/product/${id}`} className='link'>
            <div className={s.container}>
                <div className={s.image} style={{ backgroundImage: `url(${image})` }}></div>

                <div className={s.text}>
                    <div>
                        <h2 className={s.title} style={{ marginBottom: '0', fontSize: '27px' }}>{name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className={s.stars}></div>
                            <span style={{ fontSize: '21px', fontWeight: '600' }}>5.0</span>
                        </div>
                    </div>
                    <div>
                        <h2 className={s.price}>${price}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}