import React, { useEffect, useState } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import Stripe from './Stripe'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart)
    }, [reload])

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products?.map((product, index) => {
                    return (
                        <Card key={index} product={product} addToCart={false} removeFromCart={true} setReload={setReload} reload={reload} />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
                <Stripe products={products} setReload={setReload} />
            </div>
        )
    }

    return (
        <Base title="Cart page" description="Ready to Checkout!">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
}

export default Cart
