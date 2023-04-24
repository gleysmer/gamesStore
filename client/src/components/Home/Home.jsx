import Jumbotron from "../Jumbotron/Jumbotron";
import Info from "../Info/Info";
import TinyCarousel from "../Carousels/TinyCarousel";
import Footer from "../Footer/Footer"
import s from './home.module.css'

export default function Home() {

  return (
    <div className={s.container}>
      <div className={s.banners}>
        <div>
          <Jumbotron />
        </div>
        <div>
          <Info />
        </div>
      </div>

      <div>
        <h1 className={s.title}>Más populares</h1>
        <TinyCarousel slides={5} />
      </div>

      <div>
      <TinyCarousel slides={5} />
      </div>

      <Footer/>
    </div>
  );
}
