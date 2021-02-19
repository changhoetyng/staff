import React, { Component } from "react";
import Header from "../sharedComponent/Header";
import FullPageLoader from "../hooks/FullPageLoader";
import Button from "react-bootstrap/Button";
import "../css/Setting.css";
import { api } from "../api/api"
import Cookies from "js-cookie";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            history: this.props.history,
            username: "",
            email: "",
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        await api
            .get("/user")
            .then((res) => {
                this.setState({ username: res.data.user.username, email: res.data.user.email })
            })
            .catch((err) => console.log(err))
        this.setState({ loading: false });
    }

    async save() {
        this.setState({ loading: true });
        await api
            .patch("/user/changeEmail", {
                email: this.state.email
            })
            .catch((err) => console.log(err))
        await api
            .patch("/user/changeUsername", {
                username: this.state.username
            })
            .then((res) => {
                Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
                Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 });
            })
            .catch((err) => console.log(err))

        this.componentDidMount();
        this.setState({ loading: false });
    }

    async modalPopUp() {

    }

    async changePassword() {
        this.setState({ loading: true });
        await api
            .patch("/user/changeEmail", {
                email: this.state.email
            })
            .catch((err) => console.log(err))
        await api
            .patch("/user/changeUsername", {
                username: this.state.username
            })
            .then((res) => {
                Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
                Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 });
            })
            .catch((err) => console.log(err))

        this.componentDidMount();
        this.setState({ loading: false });
    }

    render() {
        return ( <
            div > { this.state.loading && < FullPageLoader / > } <
            Header history = { this.state.history }
            /> <
            div className = "container mainDiv float-left" >
            <
            h2 > Settings < /h2> <
            div className = "container overflow-hidden"
            style = {
                { marginTop: 20 } } >
            <
            div className = "row" >
            <
            div className = "col" >
            <
            p className = "word" > Email: < /p> <
            /div> <
            div className = "col" >
            <
            input type = "email"
            value = { this.state.email }
            onChange = {
                (e) => this.setState({ email: e.target.value }) }
            /> <
            /div> <
            /div> <
            div className = "row" >
            <
            div className = "col" >
            <
            p className = "word" > Username: < /p> <
            /div> <
            div className = "col" >
            <
            input type = "text"
            value = { this.state.username }
            onChange = {
                (e) => this.setState({ username: e.target.value }) }
            /> <
            /div> <
            /div> <
            div className = "row mt-5" >
            <
            div className = "col" >
            <
            Button onClick = {
                () => this.save() } > Save < /Button> <
            /div> <
            div className = "col" >
            <
            Button onClick = {
                () => this.cancelBooking() } > Change Password < /Button> <
            /div> <
            /div> <
            /div> <
            /div> <
            /div>
        );
    }
}

export default Settings;