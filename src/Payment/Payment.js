import React, { useState,useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import { useStateValue } from '../StateProvider'
import './Payment.css'
import CurrencyFormat from 'react-currency-format'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {getBasketTotal} from '../reducer'
import axios from '../axios'
import {db} from '../firebase'

function Payment() {
    const [state, dispatch] = useStateValue()
    const history=useHistory()
    const stripe = useStripe();
    const elements = useElements();

    const[succeeded,setSucceeded]=useState(false)
    const[processing,setProcessing]=useState('')
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret,setClientSecret]=useState(true)

    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
       const getClientSecret=async()=>{
        const response=await axios({
            method:'POST',
            //Stripe expects the total in a currencies subunits
            url:`/payments/create?total=${getBasketTotal(state.basket)*100}`
        })
        setClientSecret(response.data.clientSecret)
       }
       getClientSecret()
    }, [state.basket])
    console.log('the client secret===',clientSecret)
    const handleChange = (e) => {
        //Listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }
    const handleSubmit = async(e) => {
        //do all fancy stripe stuff
        e.preventDefault()
        setProcessing(true)

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
            
            console.log('paymentIntent===',paymentIntent)
            //paymentIntent=payment confirmation
            db.collection('users').doc(state.user?.uid).collection('orders')
            .doc(paymentIntent.id).set({
                basket:state.basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{state.basket?.length}items</Link>)
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{state.user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {state.basket.map((item,i) => (
                            <CheckoutProduct key={i} id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                Order Total : <strong> {value} </strong>
                                            </p>
                                           
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(state.basket)}
                                    displayType={"text"}
                                    prefix={"$ "} />
                                <button disabled={processing||disabled||succeeded}>
                                    <span>{processing?<p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                            {/*Errors*/}
                            {error?<div>{error}</div>:''}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
