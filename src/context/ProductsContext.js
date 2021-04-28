import axios from "axios";
import React, { useReducer } from "react";
import { calcSubPrice, calcTotalPrice, getCountProductsInCart } from "../helpers/calcPrice";
import { JSON_API } from "../helpers/constants";

export const productsContext = React.createContext();
const INIT_STATE = {
    productsData: [],
    paginationPages: 1,
    cart: {},
    cartLength: getCountProductsInCart()
};
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { 
                ...state, 
                productsData: action.payload.data, 
                paginationPages: Math.ceil(action.payload.headers["x-total-count"] / 4) 
            }; // replaces productsData with action.payload
        case "GET_CART":
            return {...state, cart: action.payload};
        case "CHANGE_CART_COUNT":
            return {...state, cartLength: action.payload};
        default:
            return state;
    }
};
const ProductsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    async function getProducts(history) {
        const search = new URLSearchParams(history.location.search)
        search.set('_limit', 4)
        history.push(`${history.location.pathname}?${search.toString()}`)

        console.log(`${JSON_API}?${window.location.search}`, ' eto adress na kotoryi idet zapros')

        let res = await axios.get(`${JSON_API}${window.location.search}`);
        dispatch({
            type: "GET_PRODUCTS",
            payload: res
        });
    }

    function addProductToCart (product) {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }

        let newProduct = {
            item: product,
            count: 1,
            subPrice: 0
        }
        let filteredCart = cart.products.filter(elem => elem.item.id === product.id)
        if(filteredCart.length > 0){
            cart.products = cart.products.filter(elem => elem.item.id !== product.id)
        }else{
            cart.products.push(newProduct)
        }

        newProduct.subPrice = calcSubPrice(newProduct)
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))

        dispatch({
            type: "CHANGE_CART_COUNT",
            payload: cart.products.length
        })
    }
    
    function getCart(){
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart
        })
    }

    function changeProductCount (count, id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.products = cart.products.map(elem => {
            if(elem.item.id === id){
                elem.count = count
                elem.subPrice = calcSubPrice(elem)
            }
            return elem
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    function checkProductInCart (id) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart){
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(elem => elem.item.id === id)
        return newCart.length > 0 ? true : false
    }


    return (
        <productsContext.Provider
        value={{
            productsData: state.productsData,
            paginationPages: state.paginationPages,
            cart: state.cart,
            cartLength: state.cartLength,
            getProducts,
            addProductToCart,
            getCart,
            changeProductCount,
            checkProductInCart
        }}>
            {children}
        </productsContext.Provider>
    );
};
// let cart = {
//     products: [
//         {
//             item: product,
//             count: 5,
//             subPrice
//         },
//         {
//             item: product,
//             count: 5,
//             subPrice
//         }
//     ], TotalPrice: 125
    
// }
export default ProductsContextProvider;
