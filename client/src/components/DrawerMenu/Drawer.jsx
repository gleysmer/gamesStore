import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaHome, FaClock } from "react-icons/fa"
import { MdLocationPin } from 'react-icons/md'
import { AiFillSetting } from "react-icons/ai";
import IconMenu from "./IconMenu";
import s from './drawer.module.css'


export default function DrawerMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div onClick={toggleDrawer} className={s.burguer}><IconMenu /></div>

      <Drawer open={isOpen} onClose={toggleDrawer} direction="left" style={{backgroundColor: 'rgba(118, 121, 121, 0.301)', backdropFilter: 'blur(10px)'}}>

        <div className={s.container}>
          <div className={s.info}>
            <h4 style={{ marginBottom: '5px', fontSize: '32px' }}>GAMER STORE</h4>

            <div className={s.location}>
              <MdLocationPin size={'25px'} style={{ marginTop: '10px', color: 'red' }} />
              <h4 style={{ fontSize: '18px', marginTop: '5px' }}>Abasto Shopping <br /><span style={{ fontSize: '15px' }}>Buenos Aires, Argentina</span></h4>
            </div>

            <h4> <FaClock size={'18px'} /> Opens at <span>8:00 AM</span></h4>
            <hr style={{ width: '80%' }} />
            <div className={s.first}>
              <Link to={'/home'}>
                <button><FaHome /> Home</button>
              </Link>
              <button><FaInfoCircle /> FAQ</button>
            </div>
          </div>

          <div className={s.buttons}>
            <h2>Shop by Console</h2>
            <button>Xbox Series</button>

            <button>Xbox One</button>

            <button>PlayStation 5</button>

            <button>Playstation 4</button>

            <button>Nintendo Switch</button>

            <button>PC Games</button>

            <button>Retro Gaming</button>
          </div>

          <h4 style={{ fontSize: '20px' }}><AiFillSetting /> Settings</h4>

        </div>
      </Drawer>
    </>
  );
}
