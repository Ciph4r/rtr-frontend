import React from 'react'
import { Component } from 'react';
import TopNav from './TopNav'
import axios from 'axios'
import { Message } from 'semantic-ui-react'
import Live from './Live'
import NetWorth from './NetWorth'
export default class Profile extends Component{

        state={
        stock:{
            name:'',
            email: this.props.user.email,
            price:0,
            units:0,
            password: ''
        },
        msg:{
            message: '',
            errors: ''
        }
     
    }


handleChange = (event) => {
    let updatedStock = {...this.state.stock}
    updatedStock[event.target.name] = event.target.value
    this.setState({
        stock:updatedStock
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


    const createStock = async () => {

        try{
          const token = await JSON.parse(localStorage.getItem('token'))
          let axiosConfig = {
              headers:{
                'Content-Type': 'application/json; charset=UTF-8',
                'auth-token': token,
                'Access-Control-Allow-Origin': '*'
              }
            }
            let response = await axios.post(`${process.env.REACT_APP_URL}/stock/create`, this.state.stock ,axiosConfig)
            if(response.status === 200){
                this.props.updateCapital(this.state.stock.password)
                let msg = {errors : '' , message: response.data.message}
                this.setState({
                    msg
                })
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
        let updatedPW = {...this.state.stock , password: enteredPassword}
        this.setState({
            stock :updatedPW
        },()=> {
            createStock()
        } )



    }
}

// componentDidMount(){
//     let updateState = {...this.props.user , userEmail: this.props.user.email}

//     this.setState({
//         user:updateState
//     })
// }





    render (){
        const {name, price, units} = this.state.stock
        return (
            <div className='ui' style= {{display:'flex' , flexDirection:'column'}} >
               <TopNav user = {this.props.user} logout = {this.props.logout}>Create Stock</TopNav>
                <div style={ {display:'flex',marginTop:'200px'}}>
                    
                <div style = {{ textAlign:'center'}}>
                    <h2> Capital: {this.props.user.capital.toFixed(2)}</h2>
                    <NetWorth capital = {this.props.user.capital}/>
                    <hr/>
                    <Live/>
                    </div>
{/* 
                    <div style = {{display:'flex' ,flexDirection:'column' , alignItems:'center' , marginTop:'20px'}}>
                         <h2>Capital: ${this.props.user.capital.toFixed(2)}</h2>
                    </div>
                    <hr/> */}
                    <form className='ui form' style={{display:'flex', flexDirection:'column', alignItems:"center" , width:'100%'}} onSubmit={this.handleSubmit}>
                   
                
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
                            <label htmlFor='subject'>Units</label>
                            <div className='ui fluid input'>
                                <input type='number' name='units' value={units} min={1} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='field'>
                            <label htmlFor='article'>Price</label>
                            <div className='ui fluid input'>
                                <input type='number' name='price' value={price}  min={1} onChange={this.handleChange} />
                            </div>
                        </div>

                    </div>
                    <div className='field' style={{}}>
                            <label htmlFor='article'>Total Cost</label>
                            <div className='ui fluid'>
                                <h2>${price*units}</h2>
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