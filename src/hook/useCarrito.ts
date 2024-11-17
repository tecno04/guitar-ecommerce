import { useEffect, useState } from "react"
import {db} from "../data/db"
import { cartItem } from "../types"

export const useCarrito = () => {

    const initialCart = (): cartItem[] => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, _] = useState(db)
    const [Carrito, setCarrito] = useState(initialCart)

    function CleanCarrito() {
        setCarrito([])
    }

    const cartTotal = Carrito.reduce((total, item) => total + (item.quantity * item.price), 0 )

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(Carrito))  
    }, [Carrito])

    return {
        data,
        Carrito,
        CleanCarrito,
        cartTotal
    }

}