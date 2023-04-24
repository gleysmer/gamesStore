import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import s from './search.module.css'

export default function SearchBar() {
    const [Search, setSearch] = useState('')
    
    const history = useHistory()
    const navigateTo = (url) => {
        history.push(url)
    }

    function onChange(e) {
        e.preventDefault();
        setSearch(e.target.value)
    }

    function onSearch(e) {
        if (e.key === 'Enter') {
            navigateTo(`/search/${Search}`)
        }
    }

    return (
        <div className={s.container} title="Busca un juego">
            <div className={s.search_bar}>
                <div className={s.img_container}></div>
                <div className={s.input_container}><input type="search" placeholder='Buscar...' className={s.input} onChange={onChange} onKeyDown={onSearch} value={Search} /></div>
            </div>
        </div>
    )
}