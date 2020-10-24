import React from 'react'
import './Checkout.css'
import SubTotal from '../SubTotal/SubTotal'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
function Checkout(props) {
    console.log(props)
    const [state,dispatch]=useStateValue()
    //console.log(basket)
    return (
        <div className='checkout'>
            <div className='checkout__left'>
            <img className='checkout__ad' src='https://images-eu.ssl-images-amazon.com/images/G/31/img16/men-apparel/201708/GW/GW_PC_Hero_1500x300_-festiv._V517410320_.jpg' 
            alt=''/>
            <div className='checkout__title'>
            
                <p>Your Shopping Basket</p>
               
                <h2>{state.basket.map((item,i)=><CheckoutProduct key={item.id} 
                id={item.id} 
                title={item.title}
                image={item.image} price={item.price}
                rating={item.rating}/>)}</h2>
            </div>
            </div>
            <div className='checkout__right'>
               <SubTotal/>
              
            </div>
        </div>
    )
}

export default Checkout
