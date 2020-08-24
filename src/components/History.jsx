import React from 'react'
import { Component } from 'react';
import TopNav from './TopNav'
import axios from 'axios'
import Container from '@material-ui/core/Container';


export default class History extends Component{
    state = {
        history: []
    }

componentDidMount(){
    let axiosConfig = {
        headers:{
          'Content-Type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
    }
    axios.get(`${process.env.REACT_APP_URL}/history`, this.state.stock ,axiosConfig).then((response) =>{
        
        this.setState({
            history: response.data.history
        })
    })
}


    render(){
        return(
            <div style = {{display:'flex' , flexDirection:'column'}}>
                <TopNav  user = {this.props.user} logout = {this.props.logout}>History</TopNav>
                        <Container maxWidth="lg" style = {{marginTop : '100px'}}>
                        <ul style={{listStyleType:'none' }} >
                         {this.state.history.map((item, i) => (
                              <li key={item._id}>
                                 <div style ={{display:'flex' }}>
                                 <p style={{color:'red'}}>
                                 {item.timestamp}
                                    </p>
                                    <br/>
                                    <p style ={{color: 'green' , marginLeft:'20px'}}>
                                       {item.message }
                                     </p>
                                         </div>
                                 </li>
        ))}
        <div />
      </ul>
                        </Container>
                        
            </div>
        )
    }
}