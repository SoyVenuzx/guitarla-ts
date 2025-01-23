export type Guitar = {
  id: number 
  nombre: string
  precio: number
  img: string
}

export type CartItem = Guitar & {
  quantity: number
}

export type GuitarID = Guitar['id']

//* Heredar de un type desde una interfaz
//- export interface CarItem extends Guitar {}
