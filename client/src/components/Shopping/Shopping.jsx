import Filters from "../Filters/Filters";
import OrderButtons from "../OrderButtons/OrderButtons";
import Cards from "../Cards/Cards"
import PaginationButtons from "./PaginationButtons";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from '../../redux/actions'
import s from './shopping.module.css'

export default function Shopping() {
  const { name } = useParams()
  const dispatch = useDispatch()
  const products = useSelector(state => state.searched_games)
  const page = useSelector(state => state.page)

  useEffect(() => {
    dispatch(getProducts(name, page))
  }, [])

  if (products && products.length > 0) {
    return (
      <div className={s.container}>
        <div className={s.options}>
        <OrderButtons />
          <Filters />
        </div>
        <PaginationButtons />
        <Cards products={products} />
      </div>
    )
  } else if (name) {
    return (
      <div className={s.message}><h4 className={s.text}>No se encontraron productos para <h4 className={s.textname}>"{name}"</h4></h4></div>
    )
  } else {
    return (
        <div className={s.container}>
          <div className={s.options}>
            <OrderButtons />
            <Filters />
          </div>
          <PaginationButtons />
          <Cards products={products} />
        </div>
      )
  }
}