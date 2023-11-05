'use client'
import React,  { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InjectedConnector} from "wagmi/connectors/injected"
import { useConnect } from 'wagmi';

const AuthWrapper = ({ children }) => {
  const router = useRouter();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    })

    const connectorWs = () => {
      // Replace 'wss://example.com/socket' with your WebSocket server URL.
const socket = new WebSocket('ws://16.16.185.83:80');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened:', event);
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const message = event.data;
  console.log('Received message:', message);

  // Handle the incoming message here.
  // You can parse JSON, display it on your webpage, or perform other actions.
});

// Connection closed
socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
  } else {
    console.error('WebSocket connection abruptly closed');
  }
});

// Connection error
socket.addEventListener('error', (event) => {
  console.error('WebSocket connection error:', event);
});

// You can also send messages using the 'send' method.
// socket.send('Hello, WebSocket server!');
    
     
    };

    
  
  useEffect(() => {
    const loginToken = localStorage.getItem("bih");
    if (!loginToken) {
      router.push("/login");
    } else{
      connect();
    }

    connectorWs()
  }, [connect, router]);

  return children;
};

export default AuthWrapper;
