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
  useEffect(() => {
    const loginToken = localStorage.getItem("bih");
    if (!loginToken) {
      router.push("/login");
    } else{
      connect();
    }
  }, []);

  return children;
};

export default AuthWrapper;
