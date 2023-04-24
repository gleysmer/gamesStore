import { React, useEffect, useReducer, useState } from "react";
import axios from 'axios'
import "./shoppingCart.css";
import Footer from "../Footer/Footer";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
/*let cartFromLocalStorage = [];
  if (localStorage.getItem("cart")) {
    cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  }*/
/**/

const BACK_HOST = 'http://localhost:3001'

export default function ShoppingCart({unidades}) {

const [direccionDeEnvio, setDireccionDeEnvio] = useState('') 
  const [inputValue, setInputValue] = useState('')
  

const handleInputChange = (value) => {
  setInputValue([...inputValue, value]);

  if (value!== '') {
    setIsFormComplete(true);
  } else {
    setIsFormComplete(false);
  }
};
// console.log("inputValue es: ", inputValue)

// console.log("unidades es: ", unidades)
  
  

  const dispatch = useDispatch();
  const [wea, setWea] = useState();

  const [formComplete,setIsFormComplete]= useState(false)

  const carrito = useSelector((state) => state.cart);
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState([...carrito, ...cartFromLocalStorage]);

  const clearCartHandler = () => {
    dispatch(clearCart());
    setCart([]);
  };

  const eliminarProducto = (id) => {
    const updatedCart = cart.filter((p) => p.id !== id);
    console.log(updatedCart); // Imprimir nuevo carrito en la consola
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Agregar esta línea para guardar el carrito actualizado en el localStorage
    setCart(updatedCart); // Actualizar el estado del carrito con el nuevo carrito filtrado
  };
  const confirmDelete = () => {
    swal({
      title: "Eliminar",
      text: "Estas seguro de eliminar todo los productos?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        clearCartHandler();
        swal({
          text: "Eliminado exitosamente",
          icon: "success",
        });
      }
    });
  };

  const confirmPurchase = () => {
   
    swal({
      title: "Abonar la compra",
      text: "Desea pagar?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        // clearCartHandler();
        compraHandler();
        setTimeout(swal({
          text: "Redirigiendo a pago",
          icon: "success",
        }), 2500)

        // swal({
        //   text: "Compra realizada",
        //   icon: "success",
        // })
        clearCartHandler();
      }
    });
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [errors, setErrors] = useState({});
  const validateInput = (direccionDeEnvio) => {
    let errors = {};
    if(!direccionDeEnvio.length) errors.direccionDeEnvio ='Por favor ingrese su direccion'
    return errors
  }
const onBlurr =()=>{
 setErrors(validateInput(direccionDeEnvio));
}
  

  
  const compraHandler = async () => {
    try {
      // let juegos = juegosId();

      // console.log("inputValue es: ", inputValue)
      let usuario =  window.localStorage.getItem('user_session', JSON.stringify()) 
      // const usuario = JSON.parse(localStorage.getItem('usser_sesion'))
      usuario = JSON.parse(usuario)
         const localStorageId = JSON.parse(localStorage.getItem('cart'))
   
    let orden = { 
      "date": "",
      "idUser": usuario.id,
        "status": "pending",
        "address": direccionDeEnvio,
        "total": 2000,
        "productAndQuantity": [] 
    }
    
    let cantidades = inputValue.map(cantidad => ({quantity: parseInt(cantidad)}))
    let weaMap = localStorageId.map(juego => ({idProduct: juego.id}))
    
    orden.productAndQuantity = weaMap.map((producto, index) => ({...producto, ...cantidades[index]}))

    const response = await axios.post(
      `${BACK_HOST}/orders`, orden
      )
  
  
      window.open(response.data.init_point, '_blank');

      // clearCartHandler();

    } catch (error) {
      console.error(error);
    }
  };


  const handleSetDirection = (e) => {
    // console.log(e.target.value)
    setDireccionDeEnvio(e.target.value)
    if (e.target.value!== '') {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }

  }
  return (
    <div className="bigContainer">
   
      <div className="checkoutContainer">
        <h1 className="miCarrito">Mí carrito</h1>
        <div>
          <button onClick={() => confirmDelete()}>Limpiar carrito</button>
        </div>
        <div className="productShoppingCart_ProductRow">
          <div className="products_row">
            <form  >
              {cart.map((p, index) => {
                return (
                  <div>
                    <Product
                      image={p.image}
                      name={p.name}
                      price={p.price}
                      id={p.id}
                      eliminarProducto={eliminarProducto}
                      onInputChange={handleInputChange}
                    />
                  </div>
                );
              })}
            </form>
          </div>

          {/**Footer de envio */}
          <div className="carrito_NewCheckOutFooter">
            <div className="carrito_ContentShippingCalculator">
              <form className="carrito_envioForm"  >
                <p className="calcular">
                  {/*Calcular envío por *empresa de mensajería**/}
                </p>
                <div>
                  <label>Ingrese su direccion: </label>
                  <input
                    onChange={handleSetDirection}
                    className="inputPostal"
                    placeholder="Ingrese su direccion..."
                    onBlur={onBlurr}
                 
                    required
                    value={direccionDeEnvio}
                   
                  />
                </div>

                {errors.direccionDeEnvio && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.direccionDeEnvio}
            </p>)}

                {/*<button type="submit"> Consultar </button>
                <div className="carrito_PrecioEnvio">
                  <p className="envioPrice">
                    $ <span> - </span>
            </p>
                </div>*/}
              </form>
            </div>
            <div className="carrito_ContentPrices">
              <div className="carrito_newCheckoutSubTotal">
                <div className="carrito_newCheckoutSubtotalLeft">
                  <p>Haga click en comprar para confirmar tu compra</p>
                </div>

              </div>

              <button hidden={!formComplete} onClick={() => {
                confirmPurchase(); 
                // compraHandler()

                  }
                }
              >comprar</button>
            </div>
          </div>
          <div>{/**Loader */}</div>

          <Footer/>
        </div>
      </div>
    </div>
  );
}
// comentario