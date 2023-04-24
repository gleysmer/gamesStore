// ====== COMPONENTS ======
import LandingPage from "./components/Landing/LandingPage";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import FormRegister from "./components/FormRegister/FormRegister";
import Detail from "./components/Detail/Detail";
import Shopping from "./components/Shopping/Shopping";
import ArrowButton from "./components/ArrowButton/ArrowButton";
import SideMenu from "./components/SideMenu/SideMenu";
import { HomeLogin } from "./components/HomeLogin/HomeLogin";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { Dashboard } from "./components/Admin/Dashboard/Dashboard";
import Menu from "./components/Admin/Menu/Menu";
import AllUsers from "./components/Admin/AllUsers/AllUsers";
import { Perfil } from "./components/UserProfile/Perfil";
import ModifProduct from "./components/Admin/ModifProduct/ModifProduct";
import GetOrders from "./components/Admin/getOrdes/GetOrders";
import GetProducts from "./components/Admin/getProduct/GetProduct"
import FormCreateProduct from './components/FormCreateProduc/FormCreateProduc';
import UserProfile from './components/UserProfile/UserProfile';
import DelectProduct from "./components/Admin/Delect product/DelectProduct";
// ====== COMPONENTS ======

// ==== imports ====
import { HashRouter, Route, Switch, useLocation } from 'react-router-dom'
import './App.css';
// ==== imports ====

function App() {
  const location = useLocation();

  const adminLocations = () => {
    return (location.pathname === '/admin' ||
      location.pathname === '/admin-delete-product' ||
      location.pathname === "/admin-Orders" ||
      location.pathname === "/admin-product" ||
      location.pathname === '/admin-submit-product' ||
      location.pathname === '/admin-users')
  }

  const nullLocations = () => {
    return (location.pathname === '/' || location.pathname === '/log-in' || location.pathname === '/register' || location.pathname === '/develop-route' || adminLocations())
  }

  const arrowButtonsLocations = () => {
    return (location.pathname === '/' || location.pathname === '/develop-route' || adminLocations())
  }


  return (
    <div className="App">

      {nullLocations() ? null : <SideMenu />}
      {nullLocations() ? null : <Nav />}
      {arrowButtonsLocations() ? null : <ArrowButton />}
      {adminLocations() ? <Menu /> : null}

      <HashRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/register' component={FormRegister} />
          <Route exact path='/log-in' component={HomeLogin} />
          <Route exact path='/product/:id' component={Detail} />
          <Route exact path='/user-profile/:user' component={UserProfile} />
          <Route exact path='/search/:name' component={Shopping} />
          <Route exact path='/shopping-cart' component={ShoppingCart} />
          <Route exact path='/shopping/daily-offers' component={Shopping} />
          <Route exact path='/user-profile/:user/perfil' component={Perfil} />

          {/* RUTA DE DESARROLLO, PARA MOSTRAR COMPONENTE EN DESARROLLO */}
          <Route exact path='/develop-route' component={Dashboard} />


          {/* RUTAS DE ADMINISTRADOR */}
          <Route exact path='/admin' component={Dashboard} />
          <Route exact path='/admin-submit-product' component={FormCreateProduct} />
          <Route exact path="/admin-modif-product/:id" component={ModifProduct} />
          <Route exact path='/admin-users' component={AllUsers} />
          <Route exact path="/admin-product" component={GetProducts} />
          <Route exact path="/admin-Orders" component={GetOrders} />
          <Route exact path="/admin-delete-product" component={DelectProduct} />

        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
