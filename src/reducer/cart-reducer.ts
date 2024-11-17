import { db } from "../data/db"
import { cartItem, guitar } from "../types"


//Definimos los tipos de acciones que vamos a usar con el reducer
export type CartActions = 
{ type: 'add-cart', payload: { item: guitar } } | 
{ type: 'remove-cart', payload: { id: guitar['id'] } } |
{ type: 'increase-quantity', payload: { id: guitar['id'] } } |
{ type: 'decrease-quantity', payload: { id: guitar['id'] } } |
{ type: 'clear-cart' }

/*creamos un type para el state de la app, que la "data" sera del tipo "Guitar" pero array
  y "cart" que sera del tipo "cartItem" pero tambien array
*/
export type CartState = {
    data: guitar[]
    cart: cartItem[]
}

//objeto de estado inicial para pasarle al reducer - que sera del tipo state antes definido
export const initialState : CartState = {
    data: db,
    cart: []
}

const MAX_GUITAR = 5

//Reducer para usar con el hook useReducer
export const cartReducer = (state: CartState = initialState, action: CartActions) => {

    if(action.type === 'add-cart'){

        const exists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updateCart: cartItem[] = []


        if (exists) {

            updateCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_GUITAR){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                }else{
                    return item
                }
            })

        } else {

            const newItem : cartItem = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updateCart
        }
    }

    if(action.type === 'remove-cart'){

        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)

        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'decrease-quantity'){
        return {
            ...state
        }
    }

    if(action.type === 'increase-quantity'){
        return {
            ...state
        }
    }

    if(action.type === 'clear-cart'){
        return {
            ...state
        }
    }

    return state
}











