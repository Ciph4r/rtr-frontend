import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Component } from 'react';
import axios from 'axios'
import TopNav from './TopNav'
import StockCard from './StocksCard'
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom'
import search from '../middleware/search'
import Search from './Search'
import Live from './Live'
import LeaderBoards from './LeaderBoards'


export default class Dashboard extends Component{


    componentDidMount(){
        axios.get(`${process.env.REACT_APP_URL}/stock/all`).then((response) => {
            this.props.updateStock(response.data.stocks)
        })
    }



    render (){
        return (
            <div>
                <TopNav user = {this.props.user} logout = {this.props.logout}>Home</TopNav>
                <div style ={{display:'flex' , marginTop: '100px'}}>
                <Container maxWidth = 'sm'>
                <div >
                 <Live/>
                 <div style={{marginTop:'50px'}}>
                    <LeaderBoards/>
                    </div>
                </div>
            </Container>
                <Container maxWidth='lg'>
                <Search searchTerm = {this.props.searchTerm} handleSearch={this.props.handleSearch}  />
                <Grid container spacing={3} justify = {'center'} style = {{marginTop: '50px'}}>
                {this.props.stocks.filter(search(this.props.searchTerm)).map((stock) => {
                return   <Grid item xs={2}>
                <Link key={stock._id} to={`/stock/${stock._id}`}>
                  <StockCard stock={stock} />
                </Link>
              </Grid>
                        
                })}
                </Grid>
            </Container>

                </div>
            </div>
        )
    }
}