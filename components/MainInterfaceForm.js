

import Link from "next/link";
import { Button, TextField } from "@material-ui/core";
import {FacebookAuthContext } from '../context/FacebookAuthContext'
import redirect from 'nextjs-redirect'
import React, { useContext, useState } from 'react'
import fbripapi from '../util/fbripapi'; 



export default function MainInterfaceForm() {

  const account = useContext(FacebookAuthContext)
  const [threadId, setThreadId] = useState('')
  async function logoutAction(e) {
    e.preventDefault()
    account.setAccount({})
  }
  
  const MainViewRedirect = redirect(`/`, {
    statusCode: 200,
  })
  return !account.isValidSession() ? (<MainViewRedirect/>) : (<div>
    <form>
      <div>
        <TextField inputValue={threadId} onChange={e => setThreadId(e.target.value)} id="standard-basic" label="Thread ID" />
        <br />
        </div>
        <Button href={`/conversation/${threadId}/`} variant="contained">
        Load Conversation
      </Button>
    </form>
    <form noValidate autoComplete="off">
      <Button onClick={logoutAction} variant="contained">
        Logout
      </Button>
    </form>
  </div>); 
}