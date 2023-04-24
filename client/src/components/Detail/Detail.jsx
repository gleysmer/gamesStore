import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { buyProduct, getProductById } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import Footer from "../Footer/Footer";
import swal from 'sweetalert';
import IconDeliver from "./IconDeliver";
import IconGuarantee from "./IconGuarantee";
import IconStore from "./IconStore";
import s from "./detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(id);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  const product = useSelector((state) => state.detail);
  console.log("DETAIL GAME", product);

  const platforms = product.platforms;
  const genders = product.genders;

  let cart = useSelector((state) => state.cart);
  function goBack() {
    history.goBack();
  }

  function onBuy() {
    dispatch(buyProduct(product, id));
    console.log(id);
    alert("Producto añadido al carrito, redirigiendo");
    goBack();
  }
  function addToCart() {
    dispatch(buyProduct(product, id));
    console.log(id);
    swal("Añadido exitosamente!");
  }

  return (
    <>
      <div className={s.container}>
        <div>
          <h1 className={s.title_desktop}>{product.name}</h1>
          <div
            className={s.image}
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
        </div>

        <div className={s.info}>
          <h1 className={s.title}>{product.name}</h1>

          <h2 className={s.year}>{product.year}</h2>

          <p className={s.description}>{product.description}</p>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={s.stars}></div>
            <span
              className="estrellas"
              style={{ fontSize: "22px", fontWeight: "700" }}
            >
              5.0
            </span>
          </div>

          <h1 className={s.price}>
            <span style={{ fontSize: "29px" }}>$ </span>
            {product.price}
          </h1>

          <div className={s.platforms}>
            <h2 style={{ marginBottom: "5px" }}>Géneros:</h2>
            <div>
              {genders?.map((p, i) => {
                return (
                  <button key={i} className={s.platform_button}>
                    {p.gender.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={s.platforms}>
            <h2 style={{ marginBottom: "5px" }}>Plataformas:</h2>
            <div>
              {platforms?.map((p, i) => {
                return (
                  <button key={i} className={s.platform_button}>
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={s.extraInfo}>
          <hr style={{ width: "90%" }} />
          <h2 style={{ marginTop: "10px" }}>Garantía de compra</h2>

          <div className={s.item}>
            <IconGuarantee />
            <div className={s.text}>
              <h4 style={{ margin: "0" }}>Su compra está protegida</h4>
              <span>Ofrecemos garantía sobre nuestros productos por 30 días</span>
            </div>
          </div>

          <div className={s.item}>
            <IconDeliver />
            <div className={s.text}>
              <h4 style={{ margin: "0" }}>Delivery en el día</h4>
              <span>
              Tu compra puede ser despachada en el día
              </span>
            </div>
          </div>

          <div className={s.item}>
            <IconStore />
            <div className={s.text}>
              <h4 style={{ margin: "0" }}>Retiro en local</h4>
              <span>Podes retirar tu compra en nuestro local en el shopping Abasto</span>
            </div>
          </div>
        </div>

        <hr style={{ width: "90%" }} />
        <button className={s.button} onClick={addToCart}>
          Añadir al carrito
        </button>
        <button className={s.button} onClick={onBuy}>
          Comprar
        </button>
      </div>
    </>
  );
}
