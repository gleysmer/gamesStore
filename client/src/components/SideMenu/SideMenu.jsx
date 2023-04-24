import { Link } from "react-router-dom";
import { FaInfoCircle, FaHome, FaClock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { HiArrowUpTray } from "react-icons/hi2";
import s from "./sidemenu.module.css";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { UserSessionVer } from "../../redux/actions";

export default function SideMenu() {
  return (
    <div className={s.container}>
      <div className={s.info} title="Ir al home">
        {/* <Link to={'/post-product'}>
          <HiArrowUpTray size={40} className={s.icon} fill='white' />
        </Link> */}

        <Link to={"/home"}>
          <FaHome size={40} fill="white" className={s.icon} />
        </Link>
      </div>
      <div>
        <div title="Avenida Corrientes 3247, Lavalle 3120, C1193 CABA">
          <MdLocationPin
            size={50}
            className={s.icon}
            style={{ color: "rgb(220, 0, 0)" }}
          />
        </div>
        <div
          title="Lunes a Viernes 10:00hs - 18:00hs
Sabado:10:00hs - 14:00hs
Domingos y Feriados Cerrado"
        >
          <FaClock size={35} className={s.icon} />
        </div>
        <div title="Esto es un Proyecto Final">
          <FaInfoCircle size={35} className={s.icon} />
        </div>
      </div>
    </div>
  );
}
