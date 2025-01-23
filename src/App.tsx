import Footer from '@components/Footer'
import Header from '@components/Header'
import Guitarras from '@components/Guitarras/Guitarras'
import { useCart } from '@/lib/hooks/useCart'

export default function App () {
  const {
    cart,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    cleanCart,
    isEmpty,
    cartTotal
  } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQty={incrementQty}
        decrementQty={decrementQty}
        cleanCart={cleanCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <Guitarras addToCart={addToCart} />
      <Footer />
    </>
  )
}
