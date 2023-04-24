import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../redux/actions'
import { Link } from 'react-router-dom'
import s from './allusers.module.css'

export default function AllUsers() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    function onSearch(e) {
        dispatch(getUsers(e.target.value))


    }

    const users = useSelector(state => state.users)

    const columnas = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: false
        },
        {
            name: 'Surname',
            selector: 'surname',
            sortable: false
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: false
        },
        {
            name: 'Created at',
            selector: 'createdAt',
            sortable: false
        }
    ]

    return (
        <div className={s.container}>

            <div className={s.search_bar}>
                <div className={s.img_container}></div>
                <div className={s.input_container}><input type="search" placeholder='Search' className={s.input} onKeyDown={onSearch} /></div>
            </div>

            <DataTable
                columns={columnas}
                data={users}
                title='Registered users'
                pagination
                fixedHeaderScrollHeight='530px'
                fixedHeader
            />

        </div>
    )
}