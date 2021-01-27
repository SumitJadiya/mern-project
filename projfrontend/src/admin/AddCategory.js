import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const myCategoryForm = () => (
        <form action="">
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="for Ex. summer"
                    onChange={handleChange}
                    value={name}
                />
                <button
                    className="btn btn-outline-success"
                    onClick={onSubmit}
                >
                    Create Category
                    </button>

            </div>
        </form>
    )

    const handleChange = e => {
        setError(false)
        setName(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        setError(false)
        setSuccess(false)

        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError(false)
                    setSuccess(true)
                    setName("")
                }
            })
    }

    const successMessage = () => {
        if (success)
            return (
                <div class="alert alert-success" role="alert">
                    Category Created Successfully!
                </div>
            )
    }

    const warningMessage = () => {
        if (error)
            return (
                <div class="alert alert-error" role="alert">
                    Category Created Successfully!
                </div>
            )
    }

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    )

    return (
        <Base
            title="Create a category"
            description="Add a new category for tshirts"
            className="container bg-white p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
