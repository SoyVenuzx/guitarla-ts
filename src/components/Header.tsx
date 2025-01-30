import Carrito from './Carrito/Carrito'
import Logo from '@img/logo.svg'
import { useContext, useMemo } from 'react'
import { CartContext } from '@/reducers/cartReducer'

export default function Header () {
  const { state } = useContext(CartContext)

  const cartTotal = useMemo(
    () =>
      state.cart.reduce(
        (total, guitar) => total + guitar.precio * guitar.quantity,
        0
      ),
    [state.cart]
  )

  const isEmpty = useMemo(() => state.cart.length === 0, [state.cart])
  return (
    <>
      <header className='py-5 header'>
        <div className='container-xl'>
          <div className='row justify-content-center justify-content-md-between'>
            <div className='col-8 col-md-3'>
              <a href='index.html'>
                <img className='img-fluid' src={Logo} alt='imagen logo' />
              </a>
            </div>
            <nav className='col-md-6 a mt-5 d-flex align-items-start justify-content-end'>
              <Carrito isEmpty={isEmpty} cartTotal={cartTotal} />
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
