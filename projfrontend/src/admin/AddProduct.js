import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createProduct, getAllCategories } from './helper/adminapicall'

const AddProduct = () => {

    const history = useHistory()
    const { user, token } = isAuthenticated()

    const [value, setValue] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getaRedirect: false,
        formData: ""
    })

    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData
    } = value

    const preload = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setValue({ ...value, error: data.error })
                }
                else {
                    setValue({ ...value, categories: data, formData: new FormData() })
                }
            })
    }

    useEffect(() => {
        preload()
    }, [])

    const onSubmit = event => {
        event.preventDefault()
        setValue({ ...value, error: "", loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                console.log("data -> ", data)
                if (data.error) {
                    setValue({ ...value, error: data.error })
                }
                else {
                    setValue({
                        ...value,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        photo: "",
                        category: "",
                        loading: false,
                        getaRedirect: false,
                        createdProduct: data.name
                    })
                }
            })
    }

    const handleChange = name => event => {
        const val = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, val)
        setValue({ ...value, [name]: val })
    }

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: createdProduct ? "" : "none" }}>
            <span>{createdProduct} created successfully!</span>
        </div>
    )

    const errorMessage = () => (
        <div className="alert alert-error mt-3" style={{ display: error ? "" : "none" }}>
            <span>{createdProduct} Failed!</span>
        </div>
    )

    const handleLoading = () => {
        if (loading) {
            setTimeout(function () {
                setValue({ ...value, getaRedirect: true })
                history.push("/admin/dashboard")
            }, 2000)
        }
    }

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-dark">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {
                        categories && categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={onSubmit} className="btn btn-block btn-outline-success mb-3">
                Create Product
          </button>
        </form>
    );

    return (
        <Base
            title="Add a product here!"
            description="Welcome to product creation section"
            className="container bg-dark p-4"
        >
            <Link
                to="/admin/dashboard"
                className="btn btn-md btn-success mb-3 offset-md-2"
            >
                Admin Home
            </Link>

            <div className="row text-dark rounded">
                <div className="col-md-8 offset-md-2 text-white">
                    {handleLoading()}
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct
