import { useDispatch } from "react-redux";
import { Order } from "../../redux/actions";
import s from "./OrderButtons.module.css"
export const DEF = 'DEF'
export const ASC = 'ASC'
export const DES = 'DES'
export const PR = 'PR'

export default function OrderButtons() {
    const dispatch = useDispatch()

    function onSelect(e) {
        dispatch(Order(e.target.value))
    }

    return (
        <div className={s.order}>
            <span style={{ fontSize: '23px', fontWeight: '500', margin: '5px' }}>Ordenar por</span>
            <select name="select" onChange={onSelect}>
                <option value={DEF}>Default</option>
                <option value={ASC}>A-Z</option>
                <option value={DES}>Z-A</option>
                <option value={PR}>Precio</option>
            </select>
        </div>
    )
}