import { useState, useEffect, useMemo } from 'react'
import { Guitar, CartItem, GuitarID } from '@/types/index'

export const useCart = () => {
  const initialCart : CartItem[] = JSON.parse(localStorage.getItem('cart')!) || []
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Guitar) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExist >= 0) {
      const updatedCart : CartItem[] = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)

      return
    }

    const newItem : CartItem = {
      ...item,
      quantity: 1
    }

    setCart(cart => [...cart, newItem])
  }

  function removeFromCart (id: GuitarID) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  const incrementQty = (id: GuitarID) => {
    const tempCart = [...cart]
    const item = tempCart.findIndex(guitar => guitar.id === id)

    if (tempCart[item].quantity === MAX_ITEMS) {
      return
    }

    tempCart[item].quantity++
    setCart(tempCart)
  }

  const decrementQty = (id: GuitarID) => {
    const tempCart = [...cart]
    const item = tempCart.findIndex(guitar => guitar.id === id)

    tempCart[item].quantity--

    if (tempCart[item].quantity < MIN_ITEMS) {
      removeFromCart(id)
      return
    }

    setCart(tempCart)
  }

  const cleanCart = () => {
    setCart([])
  }

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, guitar) => total + guitar.precio * guitar.quantity,
        0
      ),
    [cart]
  )

  const isEmpty = useMemo(() => cart.length === 0, [cart])

  return {
    cart,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    cleanCart,
    isEmpty,
    cartTotal
  }
}
