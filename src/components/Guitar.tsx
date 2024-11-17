import { Dispatch } from "react"
import { CartActions } from "../reducer/cart-reducer"
import { guitar } from "../types"

type GuitarProps = {
    guitar: guitar, 
    dispatch: Dispatch<CartActions>
}

export const Guitar = ( {guitar, dispatch} : GuitarProps ) => {

    const {name, description, image, price } = guitar 

    const ruta_imagen = `img/${image}.jpg`

    return (
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={ruta_imagen} alt={name} />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={ () => dispatch({type: 'add-cart', payload: {item: guitar} } ) }
                    >Agregar al Carrito</button>
                </div>
            </div>
        </>

    )
}
