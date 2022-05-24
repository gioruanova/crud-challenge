import React, { useState, useEffect, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const MySwal = withReactContent(Swal)

const Show = () => {
    //1 - configuramos los hooks
    const [products, setProducts] = useState([])

    //2 - referenciamos a la DB firestore
    const productsCollection = collection(db, "products")

    //3 - Funcion para mostrar TODOS los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)


        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )

    }
    //4 - Funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()

    }
    //5 - Funcion de confirmacion para Sweet Alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Elimina el producto?',
            text: "No podra volver a atras esta accion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                //llamamos a la fcion para eliminar   
                deleteProduct(id)
                Swal.fire(
                    'Eliminado!',
                    'Su producto ha sido eliminado',
                    'success'
                )
            }
        })
    }
    //6 - usamos useEffect
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])
    //7 - devolvemos vista de nuestro componente
    return (
        <div className="animate__animated animate__fadeInUp">
       
                <Suspense fallback={<h1>Cargando Contenido...</h1>}>
                    
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <div className="d-grid gap-2">

                                </div>
                                <table className='table table-dark table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Stock</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.description}</td>
                                                <td>{product.stock}</td>
                                                <td>

                                                    <Link to={`/edit/${product.id}`} className="btn btn-outline-primary ">Edit</Link>
                                                    <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger ml-5">Delete</button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Link to="/create" className='btn btn-secondary mt-2 mb-2 w-50 text-uppercase'><b>Add Product</b></Link>
                    </div>
                </Suspense>
                
            
        </div>
    )
}

export default Show