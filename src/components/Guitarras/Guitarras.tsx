import { Guitarra } from './Guitarra'
import { useContext } from 'react'
import { CartContext } from '@/reducers/cartReducer'

export default function Guitarras () {
  // const [data, _] = useState(db)
  const { state } = useContext(CartContext)
  console.log({ state })

  return (
    <main className='container-xl mt-5'>
      <h2 className='text-center'>Nuestra Colección</h2>
      <div className='row mt-5'>
        {state.data.map(guitar => (
          <Guitarra key={guitar.nombre} guitar={guitar} />
        ))}
      </div>
    </main>
  )
}
