import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'

const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated()

    const adminLeftPanel = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link
                            to="/admin/create/category"
                            className="nav-link text-success"
                        >
                            Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/create/product"
                            className="nav-link text-success"
                        >
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/products"
                            className="nav-link text-success"
                        >
                            Manage Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/orders"
                            className="nav-link text-success"
                        >
                            Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightPanel = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name : </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email : </span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger">
                            Admin Area
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Base
            title="Admin Dashboard Page"
            description="Manage all your products here!"
            className="container bg-success p-4"
        >
            <div className="row">
                <div className="col-3">
                    {adminLeftPanel()}
                </div>
                <div className="col-9">
                    {adminRightPanel()}
                </div>

            </div>
        </Base>
    )
}

export default AdminDashboard
