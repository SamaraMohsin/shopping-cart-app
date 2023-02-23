import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../css/productlist.module.css";
import Product from './Product';


const ProductList = ( ) => {


    
    const[productLists,setproductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8080/api/products/all");
            const data = await response.json();
            // console.log(data)
            setproductList(data);
          } catch (e) {
            console.log("I caughgt this bug");
            console.log(e);
          }
        };
        fetchData();
      }, []);


  return (
    <div className={styles.main}>
        <h1 className={styles.ProductListheading}>Products</h1>
        <table className={styles.productlisttbl}>
            <thead>
            </thead>
            <tbody>
                {
                    productLists.length && productLists.map(item => <Product key={item.id} item={item}/>)
                }

            </tbody>
        </table>
      
    </div>
  )
}

export default ProductList
