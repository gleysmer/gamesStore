import SearchBar from "./SearchBar";
import DrawerMenu from "../DrawerMenu/Drawer";
import Account from "./Account/Account";
import NoAccount from "./NoAccount/NoAccount";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import s from "./Nav.module.css";
import IconCart from "./IconCart";
import { UserSessionVer } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Nav() {
  const user_token = window.localStorage.getItem("user_token");
  const token = JSON.parse(user_token);

  const user = useSelector((state) => state.user);

  return (
    <div className={s.nav}>
      <div className={s.container}>
        <div className={s.burguer}>
          <DrawerMenu />
        </div>

        <Link className="link" to={"/home"}>
          <h1 className={s.title}>GAMERS STORE</h1>
        </Link>

        <abbr title="Ir al perfil de usuario">
          {token ? <Account user={user} /> : <NoAccount />}
        </abbr>
      </div>

      <div className={s.search}>
        <SearchBar />
      </div>
    </div>
  );
}
