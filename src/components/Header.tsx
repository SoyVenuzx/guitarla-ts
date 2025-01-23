import Carrito from './Carrito/Carrito'
import Logo from '@img/logo.svg'
import { CartItem, GuitarID } from '@/types/index'

type HeaderProps = {
  cart: CartItem[]
  removeFromCart: (id: GuitarID) => void
  incrementQty: (id: GuitarID) => void
  decrementQty: (id: GuitarID) => void
  cleanCart: () => void
  isEmpty: boolean
  cartTotal: number
}

export default function Header ({
  cart,
  removeFromCart,
  incrementQty,
  decrementQty,
  cleanCart,
  isEmpty,
  cartTotal
}: HeaderProps) {
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
              <Carrito
                cart={cart}
                removeFromCart={removeFromCart}
                incrementQty={incrementQty}
                decrementQty={decrementQty}
                cleanCart={cleanCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
              />
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
