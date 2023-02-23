import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from  "../css/product.module.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = {...state};
  const item = {...state}
  const [quantity,setQuantity] = useState(1)


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
    <> 
    <h1 className={styles.productheading}>PRODUCT DESCRIPTION</h1>
    <div className={styles.Productbody}>
     

      <table className={styles.ProductDetails}>
        <tbody>
          <tr>
            <td>
              <img className={styles.Productimage} src={product.prodImg} width={300} height={250} />
            </td>
          </tr>
          <tr>
          <td className={styles.productname}>{product.prodName}</td>
            <td>{product.longDescription}</td>
          </tr>
          <tr>
            <td className={styles.productprice}><h4>Rs. {product.prodPrice}</h4></td>
          </tr>
          <tr>
            <td>
              <input className={styles.productquantity} type="number" min={1} value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}  placeholder="quantity" />
              <button className={styles.productcart} 
              onClick={()=>{handleAddToCart()}}
              // onClick={()=>
              //   handleAddToCart(product,quantity,navigate('/cart'))}
                >
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </td>
            <td>
        
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ProductDetails;
