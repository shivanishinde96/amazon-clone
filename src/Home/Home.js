import React, { Component } from 'react'
import Header from '../Header/Header'
import Product from '../Product/Product'
class Home extends Component {
    render() {
        return (<>
            
            <div className='home'>
                <div className='home__container'>
                    <img className='home__image' src="
                    https://images-eu.ssl-images-amazon.com/images/G/31/img18/apparel/MayART_Teaser/MayArt_Teaser_A_PCBanner_v1._CB464777758_.jpg" alt=""/>
                </div>
                <div className='home__row'>
                    {/*Product */}
                    <Product id='1' title='The lean startup' price={19.99}  image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                     rating={5}/>
                    <Product id='2' title='The lean startup' price={29.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg' 
                    rating={4}/>
                     
                </div>
                <div className='home__row'>
                   
                     <Product id='3' title='The lean startup' price={39.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                     rating={3}/>
                     <Product id='4' title='The lean startup' price={49.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                     rating={4}/>
                     <Product id='5' title='The lean startup' price={59.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                     rating={2}/>
                   
                </div>
                <div className='home__row'>
                   
                     <Product id='6' title='The lean startup' price={69.99} image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                     rating={3}/>
                </div>
            </div></>
        )
    }
}

export default Home