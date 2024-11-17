import { Dispatch } from "react"
import { CartActions } from "../reducer/cart-reducer"


export type guitar = {
    id: number
    name:string
    image: string
    description: string
    price: number
}

export type cartItem = guitar & {
    quantity: number
}

export type HeaderProps = {
    Carrito: cartItem[]
    dispatch: Dispatch<CartActions>
}