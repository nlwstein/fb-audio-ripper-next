

import Link from "next/link";
import { Button, TextField } from "@material-ui/core";
import {FacebookAuthContext } from '../context/FacebookAuthContext'
import redirect from 'nextjs-redirect'
import React, { useContext, useState } from 'react'
import fbripapi from '../util/fbripapi'; 



export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twofactor, setTwofactor] = useState('')
  const account = useContext(FacebookAuthContext)
  
  async function loginAction() { 
    const result = await fbripapi({
      method: 'POST',
      data: { email, password, twofactor },
      url: `/api/login`,
    });
    account.setAccount(result)
  }
  
  const MainViewRedirect = redirect(`/`, {
    statusCode: 200,
  })
  return account.isValidSession() ? (<MainViewRedirect/>) : (<div>
    <form noValidate autoComplete="off">
      <div>
        <TextField inputValue={email} onChange={e => setEmail(e.target.value)} id="standard-basic" label="Email" />
        <br />
        <TextField inputValue={password} onChange={e => setPassword(e.target.value)} id="filled-basic" label="Password" type="password" />
        <br />
        <TextField inputValue={twofactor} onChange={e => setTwofactor(e.target.value)} id="filled-basic" label="Two Factor Code" />
        <br />
      </div>
      <br />
      <Button onClick={loginAction} variant="contained">
        Login to Facebook
      </Button>
    </form>
  </div>); 
}