import "./product.css";

import { React, useState } from "react";
import ShoppingCart from "./ShoppingCart";

import { FaTrashAlt } from "react-icons/fa";
export default function Product({ image, name, price, id, eliminarProducto, onInputChange }) {


  const handleEliminarProducto = (id) => {
    eliminarProducto(id);
  };

  const [unidades, setUnidades] = useState([]);


  const [errors, setErrors] = useState({});


  const validateInput = (unidades) => {
    let errors = {};
    if(!unidades.length) errors.unidades ='Por favor ingrese una cantidad'
    if(isNaN(unidades) )errors.unidades="El valor debe ser un numero"
    return errors
  }
const onBlurFuncion =()=>{
  setErrors(validateInput(unidades));
}

  return (
      <div className="product_container">
        <div className="productShoppingCart_Divtitle">
          {/* <h2 className="productName">{name}</h2> */}
          <div
            className="productShoppingCart_Img"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>

        <div className="productShoppingCart_DivPrecios">
          <div className="productShoppingCart_ArtPrecio">
            <label className="productPrice">Precio:</label>
            <span className="productShoppingCart_PrecioDefault">{price}</span>
            {/* <label className="productPrice">Precio MercadoPago: </label>
            <span className="productShoppingCart_PrecioMP">{price + 1.99}</span>
            <br /> */}
            <div>
            <input
              type="number"
              min={1}
              maxLength="3"
              onBlur={onBlurFuncion}
              placeholder="unidades"

              value={unidades}
              onChange={(e) => {
                setUnidades(e.target.value);
                onInputChange(e.target.value);
              }}
            ></input>
               </div> 
               {errors.unidades && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.unidades}
            </p>)}

          </div>
          <div  onClick={() => handleEliminarProducto(id)}>
          <  FaTrashAlt className="bottomeliminar" />
          </div>
          {/* <button >enviar a front</button> */}
        </div>
      </div>
);
}