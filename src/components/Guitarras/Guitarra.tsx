import { CartContext } from '@/reducers/cartReducer'
import { Guitar } from '@/types/index'
import { useContext } from 'react'

type GuitarraProps = {
  guitar: Guitar
}

export const Guitarra = ({ guitar }: GuitarraProps) => {
  const { id, nombre, precio, img } = guitar
  const { dispatch } = useContext(CartContext)

  return (
    <>
      <div key={id} className='col-md-6 col-lg-4 my-4 row align-items-center'>
        <div className='col-4'>
          <img
            className='img-fluid'
            src={`/src/assets/img/${img}`}
            alt='imagen guitarra'
          />
        </div>
        <div className='col-8'>
          <h3 className='text-black fs-4 fw-bold text-uppercase'>{nombre}</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae
            labore odit magnam in autem nesciunt, amet deserunt
          </p>
          <p className='fw-black text-primary fs-3'>{`$${precio}`}</p>
          <button
            type='button'
            className='btn btn-dark w-100'
            onClick={() =>
              dispatch({ type: 'ADD_TO_CART', payload: { item: guitar } })
            }
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </>
  )
}
