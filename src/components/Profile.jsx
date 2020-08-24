import React from 'react'
import { Component } from 'react';
import TopNav from './TopNav'
import axios from 'axios'
import { Message } from 'semantic-ui-react'


export default class Profile extends Component{

        state={
        user:{
            name:'',
            email:'',
            userEmail: this.props.user.email,
            password: '',
            nPassword:'',
            retypeNPassword:'',
        },
        msg:{
            message: '',
            errors: ''
        }
     
    }


handleChange = (event) => {
    let updatedUser = {...this.state.user}
    updatedUser[event.target.name] = event.target.value
    this.setState({
        user:updatedUser
    })
}

handleMsgClear = () => {
    let msg = {errors : '' , message: ''}
    this.setState({
        msg
    })
}

handleSubmit = (event) => {
    event.preventDefault()
    const updateUser = async () => {
        try{
          const token = await JSON.parse(localStorage.getItem('token'))
          let axiosConfig = {
              headers:{
                'Content-Type': 'application/json; charset=UTF-8',
                'auth-token': token,
                'Access-Control-Allow-Origin': '*'
              }
            }
            let response = await axios.put(`${process.env.REACT_APP_URL}/users/update`, this.state.user ,axiosConfig)
            if(response.status === 200){
                
                
                let msg = {errors : '' , message: response.data.message}
                this.setState({
                    msg
                },() => {this.props.updateUser(response.data)})
            }
        }

        catch(err){
            let msg = {errors : err.response.data.errors , message: ''}
            this.setState({
                msg
            })
        }
    }



    const enteredPassword = prompt('Please enter your password')
    if(enteredPassword){
        let updatedPW = {...this.state.user , password: enteredPassword}
        this.setState({
            user :updatedPW
        },()=> {updateUser()} )



    }
}

componentDidMount(){
    let updateState = {...this.props.user , userEmail: this.props.user.email , email: ""}

    this.setState({
        user:updateState
    })
}





    render (){
        const {name, email , nPassword , retypeNPassword} = this.state.user
        return (
            <div className='ui' style= {{display:'flex' , flexDirection:'column'}} >
               <TopNav user = {this.props.user} logout = {this.props.logout}>Profile</TopNav>
                <div style={ {marginTop:'50px'}}>
                    <div style = {{display:'flex' ,justifyContent:'center'}}>
                        <img src = {'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'} alt= '' style={{width:'300px' , marginTop:'100px'}} />
                    </div>
                    <div style = {{display:'flex' ,flexDirection:'column' , alignItems:'center' , marginTop:'20px'}}>
                         <h2>Name: {this.props.user.name ? this.props.user.name : 'PlaceHolder'}</h2>
                         <h2>Email: {this.props.user.email}</h2>
                         <h2>Capital: ${this.props.user.capital.toFixed(2)}</h2>
                    </div>
                    <hr/>
                    <form className='ui form' style={{display:'flex', flexDirection:'column', alignItems:"center"}} onSubmit={this.handleSubmit}>
                   
                
                    {this.state.msg.errors ?  
                    <Message
                    onDismiss={this.handleMsgClear} 
                    header='Error'
                    content={this.state.msg.errors}
                    color='red'
                  />
                    :
                    this.state.msg.message
                    ?
                    <Message
                    onDismiss={this.handleMsgClear} 
                    header='Message'
                    content={this.state.msg.message}
                    color='green'
                  />
                  :
                  <div></div>
                    }





                    <div className='equal width fields' style={{display:'flex', flexDirection:'column', alignItems:"center", flexWrap:'wrap',width:'30%'}}>
                        <div className='field'>
                            <label htmlFor='author'>Name</label>
                            <div className='ui fluid input'>
                                <input type='text' name='name' value={name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='field'>
                            <label htmlFor='subject'>Email</label>
                            <div className='ui fluid input'>
                                <input type='email' name='email' value={email} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='field'>
                            <label htmlFor='article'>New Password</label>
                            <div className='ui fluid input'>
                                <input type='password' name='nPassword' value={nPassword} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='field'>
                            <label htmlFor='article'>Retype New Password</label>
                            <div className='ui fluid input'>
                                <input type='password' name='retypeNPassword' value={retypeNPassword} onChange={this.handleChange} />
                            </div>
                        </div>                      
                    </div>
                    <div className="field">
                        <button type='submit' className='ui button green'>Submit</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}