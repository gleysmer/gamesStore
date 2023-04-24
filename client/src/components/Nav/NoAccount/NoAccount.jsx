import IconAccount from "../IconAccount";
import { Link } from "react-router-dom";

import s from '../Nav.module.css'

export default function NoAccount() {
    return (
        <div className={s.items}>
            <div className={s.icon}>
                <Link to={"/log-in"} className="link">
                    <IconAccount />
                </Link>
            </div>
        </div>
    )
}