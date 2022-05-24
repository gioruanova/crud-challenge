import React, { useState, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { Link } from 'react-router-dom'


const Create = () => {
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, "products")

  const store = async (e) => {
    e.preventDefault()
    await addDoc(productsCollection, { description: description, stock: stock })
    navigate('/')
    //console.log(e.target[0].value)
  }

  return (
    <div className="animate__animated animate__fadeInDown">
      <Suspense fallback={<h1>Cargando Contenido...</h1>}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>Add Product</h1>
              <form onSubmit={store}>
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
                    <div><button type='submit' className='btn btn-secondary mt-2 mb-2 w-50 text-uppercase'><b>Add</b></button></div>
                    <Link to="/" className='btn btn-secondary mt-2 mb-2 w-50 text-uppercase'><b>Cancel</b></Link>
                  </div>
                </div>




              </form>
            </div>
          </div>
        </div >
      </Suspense>
    </div>
  )
}

export default Create