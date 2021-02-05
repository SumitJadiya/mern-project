import React, { useEffect, useState } from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'

const Home = () => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllState = () => {
        getProducts()
            .then(data => {
                if (data.error)
                    setError(data.error)
                else
                    setProducts(data)
            })
    }

    useEffect(() => {
        loadAllState()
    }, [])

    return (
        <Base title="Homepage" description="Welcome to the  Homepage">
            <div className="row text-center">
                <h1 className="text-white">All of tshirt</h1>
                <div className="row">
                    {products.map((product, index) => (
                        <div className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Base>
    )
}

export default Home
