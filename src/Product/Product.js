import React from 'react'
import { useStateValue } from '../StateProvider'
import './Product.css'
const Product=(props)=> {
    const [{basket},dispatch]=useStateValue()
    const addToBasket=()=>{
        //dispatch the item into the data layer
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id:props.id,
                title:props.title,
                price:props.price,
                image:props.image,
                rating:props.rating
            }
        })
       }
    return (
        <div className='product' key={props.id}>
            <div className='product__info'>
                <p>{props.title}</p>
                <p className='product__price'>
                    <small>$ </small>
                    <strong>{props.price}</strong>
                </p>
                <div className='product__rating'>
                <p>{props.rating}</p>
                </div>
            </div>
            <img src={props.image} alt='image'/> 
            <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}

export default Product
