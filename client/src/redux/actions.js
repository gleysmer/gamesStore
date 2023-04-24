import axios from 'axios'



import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME, GET_PRODUCT_DETAIL, ORDER, GET_PLATFORMS, GET_GENDERS, FILTER_GENDER, FILTER_PLATFORM, POST_PRODUCTS, CHANGE_PAGE, BUY_PRODUCT, UPDATE_CART, CLEAR_CART, REMOVE_ONE_FROM_CART, GET_USERS, USER_SESSION } from './actions-type'




// const BACK_HOST = 'https://back-gamestore-production.up.railway.app'
const BACK_HOST = 'http://localhost:3001'



// ========================* PRODUCTS *========================
export function getProducts(name,page) {
    console.log(`getProducts function(${name})`); // AVISO
   
    if (name) {
        return (dispatch) => {
            axios.get(`${BACK_HOST}/products?name=${name}&page=${page}`)
                .then(response => dispatch(
                    {
                        type: GET_PRODUCTS_BY_NAME,
                        payload: response.data.data.rows
                    }
                ))
                .catch(err => console.log(err))
        }
        
    } 

    else {
        return (dispatch) => {
            axios.get(`${BACK_HOST}/products?page=${page}`)
                .then(response => dispatch(
                    {
                        type: GET_PRODUCTS,
                        payload: response.data.data.rows
                    }
                ))
                .catch(err => console.log(err))
        }
    }
    
}



export function getProductById(id) {
    console.log('getProductById function()'); // AVISO

    return (dispatch) => {
        axios.get(`${BACK_HOST}/products/${id}`)
            .then(response => dispatch(
                {
                    type: GET_PRODUCT_DETAIL,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}

export function PostProducts(payload) {
    return async function (dispatch) {

        let data = await axios.post(`${BACK_HOST}/products`, payload);
        return dispatch({
            type: POST_PRODUCTS,
            payload: data.data,
        });
    };
}

// ========================* PRODUCTS *========================
export function getPlatforms() {
    return (dispatch) => {
        axios.get(`${BACK_HOST}/Plataform`)
            .then(response => dispatch(
                {
                    type: GET_PLATFORMS,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}

export function getGenders() {
    return (dispatch) => {
        axios.get(`${BACK_HOST}/Generos`)
            .then(response => dispatch(
                {
                    type: GET_GENDERS,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}

export function buyProduct(product) {
    return {
        type: BUY_PRODUCT,
        payload: product
    }
}

/*export const updateCart = (newCartData) => {
    return {
        type: UPDATE_CART,
        payload: newCartData
    }
}*/

export const clearCart = () => {
    localStorage.removeItem("cart");
    return {
        type: CLEAR_CART,
    };
};

export const removeOneFromCart = (id) => {
    localStorage.removeItem("cart");
    return {
        type: REMOVE_ONE_FROM_CART,
        payload: id
    }
}


// ========================* USERS *========================

export function registerUser(user) {
    return () => {
        axios.post(`${BACK_HOST}/postUser`, user)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
}

export function UserSessionVer() {
    const user_token = window.localStorage.getItem('user_token')
    const token = JSON.parse(user_token)
    // console.log(token);

    const user_session = window.localStorage.getItem('user_session')
    const user = JSON.parse(user_session)
    // console.log('USER SESSION', user)
    return {
        type: USER_SESSION,
        payload: user
    }
}


// ========================* PAGINATION *========================
export function Order(order) {
    return {
        type: ORDER,
        payload: order
    }
}

export function filterGender(gender) {
     return dispatch=> {
        axios.get(`${BACK_HOST}/products?gender=${gender}`)
            .then(response =>dispatch(
           
                {
                    type: FILTER_GENDER,
                    payload: response.data.data.rows
                } 
            ) )
            .catch(err => console.log(err))
    } 
/*     return{
        type:FILTER_GENDER,
        payload:gender
    } */
}

export function filterPlatform(platform) {
    return (dispatch) => {
    axios.get(`${BACK_HOST}/products?platform=${platform}`)
            .then(response => dispatch(
           
                {
                    type:  FILTER_PLATFORM,
                    payload: response.data.data.rows
                } 
            ))
            .catch(err => console.log(err))
    } 
   /*  return{
        type:FILTER_PLATFORM,
        payload:platform
    }*/
} 

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}



// =========================================================
// ========================* ADMIN *========================
// =========================================================

export function getUsers(email) {

    if (email) {
        return (dispatch) => {
            axios.get(`${BACK_HOST}/users?email=${email}`)
                .then(response => dispatch(
                    {
                        type: GET_USERS,
                        payload: response.data
                    }
                ))
                .catch(err => console.log(err))
        }
    } else {
        return (dispatch) => {
            axios.get(`${BACK_HOST}/users`)
                .then(response => dispatch(
                    {
                        type: GET_USERS,
                        payload: response.data
                    }
                ))
                .catch(err => console.log(err))
        }
    }
}