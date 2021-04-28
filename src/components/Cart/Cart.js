import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../context/ProductsContext';
import './Cart.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { calcTotalPrice } from '../../helpers/calcPrice';

const Cart = () => {
    const { getCart, cart, changeProductCount } = useContext(productsContext)

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className="cart">
            {cart.products ? (
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th>SubPrice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.products.map(elem => (
                            <tr key={elem.item.id}>
                                <td><img style={{width: "50px"}} src={elem.item.image} alt="product-img"/></td>
                                <td>{elem.item.title}</td>
                                <td>{elem.item.price}</td>
                                <td>
                                    <input type="number" 
                                    value={elem.count}
                                    onClick={() => changeProductCount()} //дописать
                                    /></td>
                                <td>{elem.item.subPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4>Total: {calcTotalPrice(cart.products)}</h4>
                <button>Купить</button>
            </div>
            ) : (<CircularProgress />)}
        </div>
    );
};

export default Cart;