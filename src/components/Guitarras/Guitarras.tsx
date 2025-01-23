import { Guitarra } from './Guitarra'
import { db } from '@/lib/data'
import { useState } from 'react'
import { Guitar } from '@/types/index'

type GuitarrasProps = {
  addToCart: (guitar: Guitar) => void
}

export default function Guitarras ({ addToCart }: GuitarrasProps) {
  const [data, _] = useState(db)

  return (
    <main className='container-xl mt-5'>
      <h2 className='text-center'>Nuestra Colección</h2>
      <div className='row mt-5'>
        {data.map(guitar => (
          <Guitarra key={guitar.nombre} guitar={guitar} addToCart={addToCart} />
        ))}
      </div>
    </main>
  )
}
