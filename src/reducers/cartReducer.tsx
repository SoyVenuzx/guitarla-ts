import { db } from '@/lib/data'
import { CartItem, Guitar, GuitarID } from '@/types'
import { createContext, Dispatch, useEffect, useReducer } from 'react'

type CartState = {
  data: Guitar[]
  cart: CartItem[]
}

export const initialState: CartState = {
  data: db,
  cart: []
}

type CartActions =
  | {
      type: 'ADD_TO_CART'
      payload: {
        item: Guitar
      }
    }
  | {
      type: 'REMOVE_FROM_CART'
      payload: {
        id: GuitarID
      }
    }
  | {
      type: 'DECREASE_QUANTITY'
      payload: {
        id: GuitarID
      }
    }
  | {
      type: 'INCREASE_QUANTITY'
      payload: {
        id: GuitarID
      }
    }
  | {
      type: 'CLEAN_CART'
    }

type CartContextType = {
  state: CartState
  dispatch: Dispatch<CartActions>
}

const defaultContextValue: CartContextType = {
  state: initialState,
  dispatch: () => {}
}

const CartContext = createContext<CartContextType>(defaultContextValue)

const init = (): CartState => {
  const cart = localStorage.getItem('cart')
  return cart ? { ...initialState, cart: JSON.parse(cart) } : initialState
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let updatedCart: CartItem[] = []
      const { item } = action.payload

      const itemExist = state.cart.find(guitar => guitar.id === item.id)

      if (itemExist) {
        updatedCart = state.cart.map(item => {
          if (item.id === itemExist.id) {
            if (item.quantity < MAX_ITEMS)
              return { ...item, quantity: item.quantity++ }
            else return item
          }

          return item
        })
      } else {
        const newItem: CartItem = {
          ...item,
          quantity: 1
        }

        updatedCart = [...state.cart, newItem]
      }

      return {
        ...state,
        cart: updatedCart
      }

    case 'REMOVE_FROM_CART':
      const { id } = action.payload

      return {
        ...state,
        cart: state.cart.filter(guitar => guitar.id !== id)
      }

    case 'INCREASE_QUANTITY':
      const tempCart = state.cart.map(item => {
        if (item.id === action.payload.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity++ }
          }
        }

        return item
      })

      return {
        ...state,
        cart: tempCart
      }

    case 'DECREASE_QUANTITY':
      const itemFound = state.cart.find(item => item.id === action.payload.id)

      if (itemFound) {
        if (itemFound.quantity < MIN_ITEMS) {
          return {
            ...state,
            cart: state.cart.filter(item => item.id !== action.payload.id)
          }
        }
      }

      const tempCart2 = state.cart.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity-- }
        }
        return item
      })

      return {
        ...state,
        cart: tempCart2
      }

    case 'CLEAN_CART':
      return { ...state, cart: [] }

    default:
      return state
  }
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, init())

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state?.cart])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
