import { Link } from 'react-router-dom'

import s from './gamecard.module.css'

export default function GameCard({ id, name, image }) {
    return (
        <Link to={`/product/${id}`} className='link'>
            <div style={{ backgroundImage: `linear-gradient(to top, #000000, rgba(0, 0, 0, 0) 25%), url(${image})` }} className={s.container}>
                <h3 className={s.name}>{name}</h3>
            </div>
        </Link>
    )
}