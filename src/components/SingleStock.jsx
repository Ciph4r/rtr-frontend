import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import StockChart from './StockChart'
import TopNav from './TopNav'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Message } from 'semantic-ui-react'
import Live from './Live'
import NetWorth from './NetWorth'


function SingleStock (props) {

    let [stock , setStock] = useState({})
    let [history , setHistory] = useState([])
    let [number , setNumber] = useState(1)
    let [send , setSend] = useState(false)
    let [password , setPassword] = useState('')
    let [route , setRoute] = useState('')
    let [msg ,setMsg] = useState('')
    let [err ,setErr] = useState('')
    const {id} = useParams()



    const getStocks = async () => {
        let data = await axios.get(`/stock/stock/${id}`)
        await setStock(data.data.stock)
        await setHistory([...data.data.stock.history])
    }
    const clearMsg = () => {
        setMsg('')
        setErr('')
    }

    // const netWorth = () => {
    //   console.log(props.stocks)
    //   let gg = props.stocks.filter((stock) => {
    //     return stock.owner === props.user.id ? 1 : 0
    //   })
      
    //   // let ff = gg.reduce((a , b) => 
    //   //    a+b.price * b.units
    //   // , 0)
    //   // console.log(ff)
    // }


    useEffect(() => {
    getStocks()
      }, []);

      const buyStock = async () => {
        clearMsg()
        try{
          const token = await JSON.parse(localStorage.getItem('token'))
          let axiosConfig = {
              headers:{
                'Content-Type': 'application/json; charset=UTF-8',
                'auth-token': token,
                'Access-Control-Allow-Origin': '*'
              }
            }
            let data = await axios.put(`/stock/buy/${id}`,{email:props.user.email, order: Number(number) , password : password} ,axiosConfig)
            setMsg(data.data.message)
        }

        catch(err){
          setErr(err.response.data.errors)
        }
    }

    const sellStock = async () => {
        clearMsg()
        try{
            const token = await JSON.parse(localStorage.getItem('token'))
            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'auth-token': token,
                  'Access-Control-Allow-Origin': '*'
                }
              }
              let data = await axios.put(`/stock/sell/${id}`,{email:props.user.email, sell: Number(number) , password: password} ,axiosConfig)
              setMsg(data.data.message)
          }

          catch(err){
            setErr(err.response.data.errors)
          }
}

      useEffect(() => {
          if (send){
              if(route === 'buy'){
                buyStock()
              }
              if (route === 'sell'){
                  sellStock()
              }
            setSend(false)
            setRoute('')
            props.updateCapital(password)
            getStocks()
          }
          

      }, [route])


        return (
            <div style = {{display:'flex' , flexDirection:'column'}}>
                <TopNav  user = {props.user} logout = {props.logout}>{stock.name}</TopNav>


                <div style = {{display:'flex'}}>
                    <CssBaseline />
                   
                    {/* <Container  style = {{width: '300px'}}> */}
                      
                      <div style = {{marginTop : '100px' , textAlign:'center'}}>
                    <h2> Capital: {props.user.capital.toFixed(2)}</h2>
                    <NetWorth capital = {props.user.capital} />
                    <hr/>
                    <Live/>
                    </div>
                      

                    {/* </Container> */}
                   <div style= {{flexDirection:'column' , width:'70%'}}>
                        <Container maxWidth="lg" style = {{marginTop : '100px'}}>
                        {err ?  
                    <Message
                   
                    header='Error'
                    content={err}
                    color='red'
                  />
                    :
                    msg
                    ?
                    <Message
                    
                    header='Message'
                    content={msg}
                    color='green'
                  />
                  :
                  <div></div>
                    }
                        <StockChart history = {history} name = {stock.name} />
                        </Container>
                        <hr/>
                        <div style = {{display: 'flex',justifyContent:'center'}}>
                            
                            <div>
                            <div>
                                <h3>Stock Avalible: {stock.units - stock.sold}</h3>
                                <h3>Price Per Stock: {stock.price}</h3>
                            </div>
                            <hr/>
                            <div className='ui fluid input' >
                                    <input type='number' name='amount'  min={1} value = {number} onChange = {(event) =>{
                                        setNumber(event.target.value)
                                        }} />
                                </div>
                                <div style = {{display:'flex'}}>
                                <form className='ui form' onSubmit={(e) => {
                                    e.preventDefault()
                                    const enteredPassword = prompt('Please enter your password')
                                    if(enteredPassword){
                                        setRoute('buy')
                                        setPassword(enteredPassword)
                                        setSend(true)
                                   }
                                    
                                }}>
                                    <button type='submit' className='ui button green'>
                                    Buy
                                    </button>
                                 </form>
                                 <form className='ui form' onSubmit={(e) => {
                                     e.preventDefault()
                                     const enteredPassword = prompt('Please enter your password')
                                     if(enteredPassword){
                                         setRoute('sell')
                                         setPassword(enteredPassword)
                                         setSend(true)
                                    }
                                }}>
                                    <button type='submit' className='ui button red'>
                                    sell
                                    </button>
                                </form>
                                </div>
                            </div>   
                        </div>
                   </div>
                      {/* <div style = {{marginTop : '100px'}}>
                          <Live/>
                      </div> */}
             </div>
            </div>
        )
    
}

export default  SingleStock