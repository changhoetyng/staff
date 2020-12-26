import React, { Component } from "react";
import Header from '../sharedComponent/Header'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history
        }
    }

    render() {
        return (
            <div>
                <Header history={this.state.history}/>
                <h1>Home page</h1>
            </div>
        )
    }
}

export default Home;