import React from 'react'
import { Component } from 'react';
import Login from './Login'
import axios from 'axios'
import Authentication from "../middleware/auth"

export default class Home extends Component{
    state = {
        user:{
            email:'',
            password:'',
            token: ""
        },
        errors:"",
        msg:'',
        signup: false

    }

    handleClearFlash = () => {
        this.setState({
            msg: "",
            errors: ''
        })
    }


    handleChange = (event) => {
        let user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({
            user
        })
    }




    handleLogin = () => { 

        this.handleClearFlash()
        if (this.state.signup){
            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
              }
            axios.post(`${process.env.REACT_APP_URL}/users/signup`, this.state.user , axiosConfig)
            .then((response) => {
                // console.log(response)
                if (response.status === 200){
                //     Authentication.login(()=> {
                //         this.props.updateUser(response.data)
                //     } , response.data.user , response.data.token)
                this.setState({
                    signup: false,
                    msg: 'You have Signed Up, You can now login'
                })
                }
                


            })
            .catch((err) => {
                if(err.response.data.errors)
                this.setState({
                    errors : err.response.data.errors
                })
            })

        }else {


            this.handleClearFlash()
            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
              }
            axios.post(`${process.env.REACT_APP_URL}/users/login`, this.state.user, axiosConfig)
            .then((response) => {
                
                Authentication.login(()=> {
                    // this.props.history.push('/profile')
                    this.props.updateUser(response.data)

                } , response.data.user , response.data.token)

                
                // const isAuthenticated = response.data.isAuthenticated
              
            })
            .catch((err) => {
                
                this.setState({
                    errors : err.response.data.errors
                })
            })

        }

    }


    handleToggle = () => {
        this.setState({
            signup : !this.state.signup
        })
    }

    render (){
        const {msg , errors, password, email , signup} = this.state
        return (
            <div>
                {this.state.signup ? 
                <Login Login = {this.handleLogin} msg = {msg} errors = {errors} password={password} email = {email} handleChange = {this.handleChange} toggle = {this.handleToggle} message = {"Have an account? Log In"} signup = {signup}>
                    SignUp
                </Login>
                
                :
                (
                <Login Login = {this.handleLogin} msg = {msg} errors = {errors} password={password} email = {email} handleChange = {this.handleChange} toggle = {this.handleToggle} message = {"Don't have an account? Sign Up"} signup = {signup}>
                Login
                </Login>
                )
                }

            </div>
        )
    }
}