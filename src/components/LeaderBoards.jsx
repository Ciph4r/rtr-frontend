import React, { Component } from 'react'
import axios from 'axios'
import { Container, Header ,List } from 'semantic-ui-react'

export default class LeaderBoards extends Component{

    state = {
        leaderBoards:[]
    }

    getLeaderBoards = async() => {
        try{
            let axiosConfig = {
                headers:{
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
              }
              let response = await axios.get(`${process.env.REACT_APP_URL}/users/leaderboards` ,axiosConfig)
              let data = response.data.returnLeader
                return data
          }
          catch(err){   
              throw(err)
          }
    }
    setData = async () => {
        let leaderBoards = await this.getLeaderBoards()
            this.setState({
                leaderBoards 
            })
        }

    compare = (state , data) => {
        for(let i=0;i<data.length;i++) 
        if(this.state.leaderBoards.length <  1|| data[i].netWorth!==state.netWorth[i]) 
         return "False"; 
         return "True"; 
       } 

    componentDidMount(){
            this.setData()
        }

        // componentDidUpdate(prevProps, prevState) {
        //     let leaderBoards = this.getLeaderBoards()
        //     console.log(leaderBoards)

        //     if (prevState.leaderBoards !== this.state.leaderBoards) {
              
        //       console.log(1)
        //     }
        //   }
  
    

    render() {
        return(
            <div style={{border:'1px solid black'}}>
                <Container fluid >
                    <div style ={{textAlign:'center'}}>
                    <Header as='h1' style={{backgroundColor: 'grey'}}>LeaderBoards</Header>
                    <Header as='h3' style={{backgroundColor: 'lightgrey'}}>Total Net Worth</Header>
                    </div>
                    <div style={{marginLeft:'25px'}}>
                        <br/>
                    <List as='ol'>
                    {this.state.leaderBoards.map((player) => {
                    return <List.Item as='li' key ={player.name}>{player.name}  <br/> {player.netWorth}</List.Item>
                    })}
                    </List>
                    </div>

                </Container>
            </div>
        )
    }
}