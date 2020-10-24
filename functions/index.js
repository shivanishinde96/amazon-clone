const functions = require('firebase-functions');
const express=require('express')
const cors=require('cors')
const stripe=require('stripe')
('sk_test_51HZVU0Ay3KjE7XR6IphjULqjtugaAnm1KhhIfwtR7xjmZjiORGZVwg5EfrnRUDXbgQvnYIIPiiJVGjMcRmaCkz9u00oMNWPrdw')

//API

//App config
const app=express()
//Middleware
app.use(cors({origin:true}))
app.use(express.json())

//API routes
app.get('/',(req,res)=>res.status(200).send('Hello World'))
app.post('/payments/create',async (req,res)=>{
    const total=req.query.total
    console.log('Payment Request Received!!! ',total)
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    })
    //OK-Created
    res.status(201).send({
        clientSecret:paymentIntent.client_secret
    })
})
//Listen
exports.api=functions.https.onRequest(app)