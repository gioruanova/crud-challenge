import { useEffect, useState, Suspense } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { Link } from 'react-router-dom'


const Edit = () => {
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)

  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "products", id)
    const data = { description: description, stock: stock }

    await updateDoc(product, data)
    navigate('/')
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id))
    if (product.exists()) {
      //console.log(product.data())
      setDescription(product.data().description)
      setStock(product.data().stock)
      console.log(product.data().stock)
    } else {
      console.log('El producto no existe')
    }
  }

  useEffect(() => {
    getProductById(id)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="animate__animated animate__fadeInDown">
      <Suspense fallback={<h1>Cargando Contenido...</h1>}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Edit Product</h1>
              <form onSubmit={update}>
                <div className='mb-3'>
                  <label className='form-label'>Description</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Stock</label>
                  <input
                    value={stock}
                    onChange={(e) => setStock(Number.parseInt(e.target.value))}
                    type="number"
                    className='form-control'
                  />
                </div>
                <div className='row'>
                  <div className='col'>
                    <div><button type='submit' className='btn btn-secondary mt-2 mb-2 w-50 text-uppercase'><b>Update</b></button></div>
                    <Link to="/" className='btn btn-secondary mt-2 mb-2 w-50 text-uppercase'><b>Cancel</b></Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

export default Edit