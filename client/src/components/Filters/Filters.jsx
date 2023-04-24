import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGenders, getPlatforms, getProducts } from '../../redux/actions'
import { DEF } from '../OrderButtons/OrderButtons'
import { filterGender, filterPlatform,} from '../../redux/actions'
import s from './filters.module.css'
import OrderButtons from "../OrderButtons/OrderButtons"
export default function Filters() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenders())
        dispatch(getPlatforms())
    }, [dispatch])


    const genders = useSelector(state => state.genders)
    const platforms = useSelector(state => state.platforms)

    function filterGenders(e) {
        dispatch(filterGender(e.target.value))
        
        console.log('console.log de genders' + e.target.value);
    }

    function filterPlatforms(e) {
        dispatch(filterPlatform(e.target.value))
        console.log('console.log de plataforms' + e.target.value);
    }


    return (
        <div className={s.container}>
            <div className={s.selcts}>

                <span className={s.title}>Género</span>
                <select name="genders" onChange={filterGenders}>
                 <option value="default">Default</option>
                    {
                        genders.map((g, i) => {
                            return (
                                <option key={i} value={g.gender}>{g.gender}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className={s.selcts}>
                <span className={s.title}>Plataformas</span>
                <select name="platforms" onChange={filterPlatforms}>
                <option hidden="true">Default</option>
                    {
                        platforms.map((p, i) => {
                            return (
                                <option key={i} value={p.name}>{p.name}</option>
                            )
                        })
                    }
                </select>
            </div>
         
        </div>
    )
}