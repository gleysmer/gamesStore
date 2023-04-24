import { useHistory } from "react-router-dom";
import s from "./button.module.css";

export default function ArrowButton() {
  const history = useHistory();
  function goBack() {
    history.goBack();
  }

  return (
    <abbr title="Retroceder">
      <button className={s.button} onClick={() => goBack()}></button>
    </abbr>
  );
}
