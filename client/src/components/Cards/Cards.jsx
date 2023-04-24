import { useHistory } from 'react-router-dom'
import Card from '../Card/Card'

import s from './cards.module.css'

export default function Cards({ products }) {
    const history = useHistory()
    const navigateTo = (url) => { history.push(url) }

    if (products.length === 1) {
        const id = products[0].id
        navigateTo(`/product/${id}`)
        return (
            <div></div>
        )
        
    } else {

        return (
            <div className={s.container}>
               
                {
                    products?.map(p => {
                        return (
                            <Card className="card-grup" key={p.id} id={p.id} name={p.name} image={p.image} price={p.price} />
                        )
                    })
                }
            </div>
        )
    }
}