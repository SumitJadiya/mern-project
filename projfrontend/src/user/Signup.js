import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import Base from '../core/Base'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, email, password, error, success } = values

    // higher order functions
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.errors)
                    setValues({ ...values, error: true, success: false })
                else
                    setValues({ ...values, name: "", email: "", password: "", error: "", success: true })
            })
            .catch(
                console.error("error in signup")
            )
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">
                                Name
                            </label>
                            <input className="form-control" onChange={handleChange("name")} type="text" value={name} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
                        </div>
                        <button className="btn btn-success btn-block" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        Signed up Successfully ! Please {" "}
                        <Link to="/signin">login here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    Sign up Failed ! {error}
                </div>
            </div>
        </div>
    )

    return (
        <Base title="signup page" description="a page for user to sign up!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>



    )
}

export default Signup
