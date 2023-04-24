import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../../redux/actions'
import s from './pagination.module.css'

export default function PaginationButtons() {
    const firstPage = 'firstPage'
    const lastPage = 'lastPage'
    const backPage = 'backPage'
    const nextPage = 'nextPage'
    
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    let state_page = useSelector(state => state.page)
    

    function handlePage(e) {
        console.log(e.target.value);

        if (e.target.value === firstPage) {
            state_page = 0
            setPage(1)
        }
        if (e.target.value === backPage && page !== 1) {
            state_page = state_page - 1
            setPage((page - 1))

        }
        if (e.target.value === nextPage && page !== 2) {
            state_page = state_page + 1
            setPage((page + 1))
            console.log(page);
        }
        if (e.target.value === lastPage) {
            state_page = 1
            setPage(2)
        }
        dispatch(changePage(state_page))
    }

    return (
        <div className={s.container}>
            <div className={s.buttons}>
                <button onClick={handlePage} value={firstPage} className={s.button}><span className="material-symbols-outlined">first_page</span></button>
                <button onClick={handlePage} value={backPage} className={s.button}><span className="material-symbols-outlined">navigate_before</span></button>
            </div>
            <button className={s.page}>{state_page + 1}</button>
            <div className={s.buttons}>
                <button onClick={handlePage} value={nextPage} className={s.button}><span className="material-symbols-outlined">navigate_next</span></button>
                <button onClick={handlePage} value={lastPage} className={s.button}><span className="material-symbols-outlined">last_page</span></button>
            </div>
        </div>
    )
}