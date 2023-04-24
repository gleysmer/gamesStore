
import { DEF, PR, ASC } from "../components/OrderButtons/OrderButtons";
import { filterGender } from "./actions";
import { useDispatch } from "react-redux";
import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCT_DETAIL,
  ORDER,
  GET_PLATFORMS,
  GET_GENDERS,
  FILTER_GENDER,
  FILTER_PLATFORM,
  POST_PRODUCTS,
  CHANGE_PAGE,
  BUY_PRODUCT,
  UPDATE_CART,
  REGISTER_USER,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,

  GET_USERS,
  USER_SESSION


} from "./actions-type";



const initialState = {
  user: [],
  games: [],
  searched_games: [],
  page: 0,
  detail: {},
  platforms: [],
  genders: [],
  cart: [],
  cartData: [],
  newPopulars: false,

  // ADMIN
  users: [],
};

export default function rootReducer(state = initialState, action) {

  console.log("-- REDUCER --", action.payload); // SHOW ACTION DATA

  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case GET_PRODUCTS:
      return {
        ...state,
        games: [...action.payload],
        searched_games: action.payload
      };

    case USER_SESSION:
      return {
        ...state,
        user: action.payload
      };
      
    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        searched_games: [...action.payload],
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        detail: action.payload[0],
      };

    case GET_GENDERS:
      return {
        ...state,
        genders: [...action.payload],
      };

    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };

    case POST_PRODUCTS:
      return {
        ...state,
        PostProduct: action.payload,
      };

    case BUY_PRODUCT:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case UPDATE_CART:
      return {
        ...state,
        cartData: action.payload,
      };
    case REMOVE_ONE_FROM_CART:
      // Encontrar el índice del producto en el carrito
      const index = state.findIndex((item) => item.id === action.payload);
      // Si el producto existe en el carrito y su cantidad es mayor a 1, se decrementa la cantidad en 1
      if (index !== -1 && state[index].quantity > 1) {
        const updatedItem = { ...state[index], quantity: state[index].quantity - 1 };
        return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)];
      }
      // Si el producto existe en el carrito pero su cantidad es 1, se elimina del carrito
      else if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      // Si el producto no existe en el carrito, se retorna el estado actual del carrito
      else {
        return state;
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case ORDER:
      var ordered_games = [...state.searched_games];

      if (action.payload === DEF) {
        return {
          ...state,
          searched_games: state.games,
        };
      }

      if (action.payload === PR) {
        ordered_games = ordered_games.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
        });
      } else {
        ordered_games = ordered_games.sort((a, b) => {
          if (a.name < b.name) {
            return action.payload === ASC ? -1 : 1;
          } else {
            return action.payload === ASC ? 1 : -1;
          }
        });
      }
      return {
        ...state,
        searched_games: ordered_games,
      };

    case FILTER_PLATFORM:

     
      return{
        ...state,
        searched_games: action.payload
      }

    case FILTER_GENDER:
      
    return{
      ...state,
      searched_games: action.payload
    }
    
////////////////////////////
      case FILTER_PLATFORM:

      var filterPlat = [...state.searched_games];
      function filterByPlat(name) {
        return filterPlat.filter((game) => {
          const aux = []
          game.platforms.forEach(obj => {
            if (obj.name === name) {
              aux.push(name)
            }
          });
          return aux.includes(name)
        })
      }
      const filter_plat = action.payload === 'DEF' ?
        filterByPlat : filterByPlat(action.payload)
      return {
        ...state,
        searched_games: filter_plat,
      };
///////
    case FILTER_GENDER:
      var ordered_game = [...state.searched_games];
      console.log(ordered_game, 'filterGender')
      function filterByGender(name) {
        return ordered_game.filter((game) => {
          const aux = []
          game.genders.forEach(obj => {
            if (obj.gender === name) {
              aux.push(name)
            }
          });
          return aux.includes(name)
        })
      }
      const filterGame = action.payload === 'DEF' ?
        ordered_game : filterByGender(action.payload)
      return {
        ...state,
        searched_games: filterGame,
      };


    case CHANGE_PAGE:
      console.log(CHANGE_PAGE);
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
}

