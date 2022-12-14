import {combineReducers} from 'redux'

import cartReducer from './cart/cartReducer'
import addressReducer from './address/addressReducer'
import orderReducer from './order/orderReducer'

const rootReducer = combineReducers({
    cart : cartReducer,
    address: addressReducer,
    order:orderReducer
})

export default rootReducer