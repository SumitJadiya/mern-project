import React from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'

const Home = () => {

    console.log("api is ", API)
    return (
        <Base title="Homepage" description="Description">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
            </div>
        </Base>
    )
}

export default Home
