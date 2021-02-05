import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getAllCategories, getProductById, updateProduct } from './helper/adminapicall'

const UpdateProduct = ({ match }) => {

    const history = useHistory()
    const { user, token } = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        updatedProduct: "",
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
        updatedProduct,
        getaRedirect,
        formData
    } = values

    const preloadProduct = productId => {
        getProductById(productId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    preloadCategories()
                    setValues({
                        ...values,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        category: data.category._id,
                        stock: data.stock,
                        formData: new FormData()
                    })
                }
            })
    }

    const preloadCategories = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({ categories: data, formData: new FormData() })
                }
            })
    }

    useEffect(() => {

        preloadProduct(match.params.productId)
    }, [])

    //TODO: Work on this
    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: "", loading: true })

        updateProduct(match.params.productId, user._id, token, formData)
            .then(data => {

                console.log("data -> ", data)
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        photo: "",
                        category: "",
                        loading: false,
                        getaRedirect: false,
                        updatedProduct: data.name
                    })
                }
            })
    }

    const handleChange = name => event => {
        const val = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, val)
        setValues({ ...values, [name]: val })
    }

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: updatedProduct ? "" : "none" }}>
            <span>{updatedProduct} updated successfully!</span>
        </div>
    )

    const errorMessage = () => (
        <div className="alert alert-error mt-3" style={{ display: error ? "" : "none" }}>
            <span>{updatedProduct} Failed!</span>
        </div>
    )

    const handleLoading = () => {
        if (loading) {
            setTimeout(function () {
                setValues({ ...values, getaRedirect: true })
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
                    value={category}
                    placeholder="Category"
                >
                    <option>Select</option>
                    {
                        categories && categories.map((ctg, index) => (
                            <option key={index} value={ctg._id} >{ctg.name}</option>
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
                Update Product
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

export default UpdateProduct
