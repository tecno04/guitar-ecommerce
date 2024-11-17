import { useEffect, useState } from "react"
import {db} from "../data/db"

export const useCarrito = () => {

    const initialCart = (): cartItem[] => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, _] = useState(db)
    const [Carrito, setCarrito] = useState(initialCart)

    function addToCart(item: Guitar) {

        const exists = Carrito.findIndex(guitar => guitar.id === item.id)

        if (exists >= 0) {

            const updatedCarrito = [...Carrito]
            updatedCarrito[exists].quantity += 1
            setCarrito(updatedCarrito)

        } else {

            const newItem : cartItem = {...item, quantity: 1}
            setCarrito([...Carrito, newItem])

            // setCarrito([...Carrito, item])
            // item.quantity = 1

        }

    }

    function IncrementarCantidad(id: Guitar['id']) {

        const encontrado = Carrito.findIndex(guitar => guitar.id === id)
        const updatedQuantity = [...Carrito]
        updatedQuantity[encontrado].quantity++
        setCarrito(updatedQuantity)

    }

    function DecrementarCantidad(id: Guitar['id']) {

        const encontrado = Carrito.findIndex(guitar => guitar.id === id)
        const updatedQuantity = [...Carrito]
        if (updatedQuantity[encontrado].quantity >= 1) {
            updatedQuantity[encontrado].quantity--
            setCarrito(updatedQuantity)
        }
    }

    function removeCart(id: Guitar['id']) {

        setCarrito(prevCarrito => prevCarrito.filter(guitar => guitar.id !== id))

    }

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
        addToCart,
        removeCart,
        IncrementarCantidad,
        DecrementarCantidad,
        CleanCarrito,
        cartTotal
    }

}