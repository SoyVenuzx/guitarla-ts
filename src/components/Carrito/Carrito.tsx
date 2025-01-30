import { CartContext } from '@/reducers/cartReducer'
import carrito from '@img/carrito.png'
import { useContext } from 'react'

interface CarritoProps {
  isEmpty: boolean
  cartTotal: number
}

export const Carrito = ({ isEmpty, cartTotal }: CarritoProps) => {
  const { state, dispatch } = useContext(CartContext)

  return (
    <div className='carrito' style={{ cursor: 'pointer' }}>
      <img className='img-fluid' src={carrito} alt='imagen carrito' />

      <div id='carrito' className='bg-white p-3'>
        {isEmpty ? (
          <p className='text-center'>El carrito esta vacio</p>
        ) : (
          <>
            <table className='w-100 table'>
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
                {state.cart.map(guitar => (
                  <tr key={guitar.id}>
                    <td>
                      <img
                        className='img-fluid'
                        src={`/src/assets/img/${guitar.img}`}
                        alt='imagen guitarra'
                      />
                    </td>
                    <td>{guitar.nombre}</td>
                    <td className='fw-bold'>{guitar.precio}</td>
                    <td className='flex align-items-start gap-4'>
                      <button
                        type='button'
                        className='btn btn-dark'
                        onClick={() =>
                          dispatch({
                            type: 'DECREASE_QUANTITY',
                            payload: { id: guitar.id }
                          })
                        }
                      >
                        -
                      </button>
                      {guitar.quantity}
                      <button
                        type='button'
                        className='btn btn-dark'
                        onClick={() =>
                          dispatch({
                            type: 'INCREASE_QUANTITY',
                            payload: { id: guitar.id }
                          })
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger'
                        type='button'
                        onClick={() =>
                          dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: { id: guitar.id }
                          })
                        }
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className='text-end'>
              Total pagar: <span className='fw-bold'>{cartTotal}</span>
            </p>
            <button
              className='btn btn-dark w-100 mt-3 p-2'
              onClick={() => dispatch({ type: 'CLEAN_CART' })}
            >
              Vaciar Carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito
