import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../StateProvider';
import {auth} from '../firebase'
function Header(props) {
    const [state,dispatch]=useStateValue()

    const handleAuthentication=()=>{
        if(state.user){
            auth.signOut()
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
            <img 
            src='data:image/jpeg;base64,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' alt='' className='header__logo'/>
            </Link>
            <div className='header__search'>
                <input className='header__searchInput' type='text' />
                <SearchIcon className='header__searchIcon'/>
            </div>
            
            <div className='header__nav'>
            <Link to={!state.user &&'/login'}>
                <div onClick={handleAuthentication} className='header__option'>
                    <span className='header__optionLineOne'>
                        Hello {state.user?state.user.email:'Guest'}
                </span>
                    <span className='header__optionLineTwo'>
                        {state.user?'Sign Out':'Sign In'}
                </span>
                </div>
            </Link>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Returns
                </span>
                    <span className='header__optionLineTwo'>
                        & Orders
                </span>
                </div>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                </span>
                    <span className='header__optionLineTwo'>
                        Prime
                </span>
                </div>
                <Link to='/checkout'>
                <div className='header__optionBasket'>
                    <ShoppingBasketIcon className='header__searchIcon'/>
                    <span className='header__optionLineTwo header__basketCount'>
                        {state.basket?.length}
                    </span>
                </div>
                </Link>
            </div>
        </div>
    )
}
export default Header
