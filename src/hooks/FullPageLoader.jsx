import React, {Component} from 'react'
import "../css/Loading.css"
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

export default class FullPageLoader extends Component {
    render() {
        return(
            <div className="loader-container">
                <div className="loader">
                    <ClimbingBoxLoader size={15} color={'#3549D1'}/>
                </div>
            </div>
        )
    }
}