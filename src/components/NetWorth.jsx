import React, { Component } from 'react'
import axios from 'axios'


export default class NetWorth extends Component{

    state = {
        netWorth: 0
    }



    componentDidMount(){
        const getNetWorth = async() => {
            try{
                const token = await JSON.parse(localStorage.getItem('token'))
                let user = JSON.parse(localStorage.getItem('user'))
                let stocks = JSON.parse(localStorage.getItem('stocks'))

                let axiosConfig = {
                    headers:{
                      'Content-Type': 'application/json; charset=UTF-8',
                      'auth-token': token,
                      'Access-Control-Allow-Origin': '*'
                    }
                  }
                  let response = await axios.get(`/portfolio/${user.email}` ,axiosConfig)
                  let portfolio = response.data.portfolio.stocks

                  let net2 = 0
                  stocks.forEach((stock) => {
                      for (const port of portfolio){
                          if (stock.name === port.name && stock.owner !== user._id){
                              net2 += stock.price * port.units
                          }
                      }
                  })
                // let net2 = stocks.map((stock) => {
                //     console.log(stock)
                //     let array = portfolio.filer((port) => {
                //         return port.name === stock.name ? 1 : 0
                //     })
                //     return array
                // })
                

                  let net1 = stocks.filter((stock) => {
                    return stock.owner === user._id ? 1 : 0
                }).reduce((a,b) => {
                    return a+b.price * b.units
                 },0)
                 
                 this.setState({
                     netWorth: (net2 + net1 + this.props.capital).toFixed(2)
                 })
              }
              catch(err){   
              }
        }
       getNetWorth()
    }

    render() {
        return(
            <div>
                <h2>{this.state.netWorth}</h2>
            </div>
        )
    }
}