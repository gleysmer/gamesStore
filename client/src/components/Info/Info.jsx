import IconDeliver from './IconDeliver'
import IconGuarantee from './IconGuarantee'
import IconStore from './IconStore'
import s from './info.module.css'

export default function Info() {
    return (
        <div className={s.container}>
            <h1>Garantía de compra</h1>
            
            <div className={s.item}>
                <IconGuarantee />
                <div className={s.text}>
                    <h4 className={s.lh4} style={{ margin: '0' }}>Su compra está protegida</h4>
                    <p className={s.letrasp}>Ofrecemos garantía sobre nuestros productos por 30 días</p>
                </div>
            </div>

            <div className={s.item}>
                <IconDeliver />
                <div className={s.text}>
                    <h4 className={s.lh4} style={{ margin: '0'}}>Delivery en el día</h4>
                    <p  className={s.letrasp}> Tu compra puede ser despachada en el día</p>
                </div>
            </div>

            <div className={s.item}>
                <IconStore />
                <div className={s.text}>
                    <h4 className={s.lh4} style={{ margin: '0' }}>Retiro en local</h4>
                    <p  className={s.letrasp}>Podes retirar tu compra en nuestro local en el shopping Abasto</p>
                </div>
            </div>
        </div>
    )
}