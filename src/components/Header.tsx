import type { HeaderProps } from '../types/index'
import { useMemo } from 'react'

export const Header = ({Carrito, dispatch} : HeaderProps) => {

    const total = useMemo(
                    () => Carrito.reduce((total, item) => total + (item.quantity * item.price), 0 ), 
                    [Carrito])

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {
                                    Carrito.length === 0 
                                    ? 
                                    <p className='alert alert-info'>No Hay Guitarras Adicionadas Aún</p>
                                    :
                                    <>
                                        <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Carrito.map(item_guitar => 
                                                    (
                                                        <tr key={item_guitar.id}>
                                                            <td>
                                                                <img className="img-fluid" src={`img/${item_guitar.image}.jpg`} alt={item_guitar.name} />
                                                            </td>
                                                            <td>{item_guitar.name}</td>
                                                            <td className="fw-bold">
                                                                ${item_guitar.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark" onClick={() => dispatch({type:'decrease-quantity', payload:{id:item_guitar.id}})   }>
                                                                </button>
                                                                {item_guitar.quantity}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark" onClick={() => dispatch({type:'increase-quantity', payload:{id:item_guitar.id}}) }>
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button" onClick={() => dispatch({type:'remove-cart', payload: {id: item_guitar.id}})  }>
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total pagar: <span className="fw-bold">${total}</span></p>
                                    <button className="btn btn-dark w-100 mt-3 p-2" onClick={() => dispatch({type: 'clear-cart'})} >Vaciar Carrito</button>
                                    </>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}
