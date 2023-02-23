import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "../css/productlist.module.css";


const Product = ({item}) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const handleQuantity= (e)=>{
        setQuantity(e.target.value);
    }


    function handleAddToCart(){
        // if(quantity >0){
        const totalPrice = item.prodPrice * quantity;
        // }
        console.log(item)
        fetch('http://localhost:8081/api/carts', {
            method : 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                prodName: item.prodName,
                prodImg: item.prodImg,
                prodQuantity: quantity,
                unitPrice: item.prodPrice,
                totalPrice: totalPrice
            })

        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
             navigate('/Cart')

            console.log(data)
        })
        .catch(error => {
            console.log('There was a problem with the fetch operation:', error);

        })
    }

  return (
    <div>
    <tr className={styles.productlistiyem} key = {item.id}>
        <td className={styles.productlistimg} c><Link to={'/ProductDetail'} state={item}><img src={item.prodImg} width={200}/></Link></td>
        {/* <td><Link to = '/ProductDetail' state={item}>{item.prodName}</Link></td> */}
        <td className={styles.productlistname}><Link to={'/ProductDetail'} state={item}> {item.prodName}</Link></td>
        <td className={styles.productlistprice}><h4>Rs. {item.prodPrice}</h4></td>
        <td>{item.shortDescription}</td>
        {/* <td>{item.longDescription}</td> */}
        <td className={styles.productlistname2}>{item.prodName}</td>
        <td className={styles.productlistquantity}><input type="number" min={1} placeholder='quantity' value ={quantity} onChange={handleQuantity}/></td>
        <td className={styles.productlistadt}><button onClick={() => handleAddToCart()}><i class="fa-solid fa-cart-shopping"></i></button></td>
        {/* <td><Button  icon={<i class="fa-solid fa-cart-shopping"></i>}/></td> */}
    </tr>
</div>
  )
}

export default Product
