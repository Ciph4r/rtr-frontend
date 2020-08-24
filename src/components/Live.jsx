import React, { useState, useEffect, useRef  } from "react";
import socketIOClient from "socket.io-client";
import {useHistory} from 'react-router-dom'
// const ENDPOINT = "http://localhost:4000";
const ENDPOINT = "https://rag-to-riches.herokuapp.com";




function Live(props) {
  const [response, setResponse] = useState([]);
  const messagesEndRef = useRef(null)

  const history = useHistory()

  const scrollToBottom = () => {
    if (messagesEndRef.current !==null){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("data", data => {
      if (response.length < 30){
        setResponse(data)
        scrollToBottom()
      }
      else if (data[data.length -1].timestamp !== response[response.length -1].timestamp){
        setResponse(data)
        scrollToBottom()
      }
    });
  }, []);

  return (
    <div style ={{height: '300px' ,overflowY: 'scroll' }} >
        <ul style={{listStyleType:'none' }} >
        {response.map((item, i) => (
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
        <div ref={messagesEndRef}></div>
      </ul>
      <button className='ui button grey' onClick = {() => {
        history.push('/history')
      }}>
        See Full History
      </button>
    </div>
  );
}

export default Live;