import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Cart.module.css';

const Cart = () => {

    const [cartData, setCartData] = useState();
    const navigate = useNavigate();

    function handleNavigation(){
        navigate('/')
    }

    function handleCheck(){
        navigate('/thanks')
    }

    function handleDelete(id){
        fetch(`http://localhost:8081/api/carts/${id}`,{
            method : 'Delete',
            headers: {
                'Content-Type':'application/json'
            },
        })
        
    }
    
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('http://localhost:8081/api/carts/all')
        const data = await response.json()
                  setCartData(data);
      }
      catch(e){
        console.log('I caughgt this bug')
      }
    }
    fetchData()
}, [])

    return (
    <div className={styles.Cartbody}>
        <h1>Cart</h1>
        <table>
            <thead>
                <tbody>
                    {
                        cartData && cartData.map(item => {
                            return <div>
                                <tr key={item.id}>
                                    <td><img src={item.prodImg} width={200}/></td>
                                    <td><h4>Product: {item.prodName}</h4></td>
                                    <td>Unit Price : Rs.{item.unitPrice}</td>
                                    <td><h4>Quantity: {item.prodQuantity}</h4></td>
                                    <td>Total Price : Rs.{item.totalPrice}</td>
                                    <td><button onClick={handleDelete(item.id)} >Delete</button></td>
                                </tr>
                                <tr>
                                    <td><button onClick={handleNavigation}>Return To home</button></td>
                                    <td><button onClick={handleCheck}>Check Out</button></td>
                                </tr>
                            </div>
                        })
                    }

                </tbody>
            </thead>
        </table>
      
      {cartData && cartData.map(item => {

      })}
    </div>
  )
}

export default Cart
