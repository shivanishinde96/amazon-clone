import React from 'react'
import './SubTotal.css'
import {useHistory} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../StateProvider'
import {getBasketTotal} from '../reducer'
function SubTotal() {
    const [state,dispatch]=useStateValue()
    const history=useHistory()
    return (
        <div className='subtotal'>
            <CurrencyFormat
            renderText={(value)=>(
                <>
               
                <p>
                    SubTotal ({state.basket.length} items):<strong>{value}</strong>
                </p>
                <small className='subtotal__gift'>
                    <input type='checkbox'/>This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(state.basket)}
            displayType={"text"}
            prefix={"$ "}/>
            <button onClick={e=>history.push('/payment')}>Proceed To CheckOut</button>
        </div>
    )
}

export default SubTotal
