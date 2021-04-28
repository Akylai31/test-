import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import SignIn from "./components/SighIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Cart from "./components/Cart/Cart"
import AuthContextProvider from "./context/AuthContext";


import ProductsContextProvider from "./context/ProductsContext";
const Routes = () => {
    return (
        <ProductsContextProvider>
          <AuthContextProvider>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact parh="/cart" component={Cart}/>
                </Switch>
            </BrowserRouter>
          </AuthContextProvider>
        </ProductsContextProvider>
    );
};

export default Routes;
