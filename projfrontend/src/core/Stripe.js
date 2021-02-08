import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import StripeCheckout from "react-stripe-checkout"
import { API } from '../backend'
import { cartEmpty } from './helper/cartHelper'

const Stripe = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const { error } = data

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalTotal = () => {
        return products?.reduce((currentValue, nextValue) => { return currentValue + nextValue.price }, 0)
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`${API}/stripePayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log(response)
                const { status } = response
                console.log(status)
                //TODO: need to fix order data
                const orderData = {
                    products,
                    transactionId: response.transaction.id,
                    amount: response.transaction.amount
                }
                cartEmpty(() => console.log("cleared cart"))
                //                setReload(!reload)
            })
            .catch(error => console.log(error))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey="pk_test_51IIFEILdVYqvLkoL64pYBKPrQ34sb4plbBChdjYbikSSWS31WXIACkEwKotGNSw1QW9fz2ZS8Zx4pTxb6cnadKfD00sE6GJGAO"
                token={makePayment}
                amount={getFinalTotal() * 100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className='btn btn-success'>Pay With Stripe</button>
            </StripeCheckout>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-warning">SignIn</button>
                </Link>
            )
    }


    const errorMessage = () => {
        error ? (
            console.log(error)
        ) : (
                console.log(error)
            )
    }

    return (
        <div>
            <h1>Stripe loaded {getFinalTotal()}</h1>
            {showStripeButton()}
        </div>
    )
}

export default Stripe
