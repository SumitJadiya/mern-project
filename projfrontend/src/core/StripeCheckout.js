import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'

const StripeCheckout = ({
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

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className='btn btn-success'>Pay With Stripe</button>
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

export default StripeCheckout
