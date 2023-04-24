import s from '../GameCard/gamecard.module.css'

export function PlatformCard({ name, image }) {
    return (

        <div style={{ backgroundImage: `linear-gradient(to top, #000000, rgba(0, 0, 0, 0) 25%), url(${image})`}} className={s.container}>
            <h3 className={s.name}>{name}</h3>
        </div>
    )
}