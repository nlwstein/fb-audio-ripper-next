import {FacebookAuthContext } from '../context/FacebookAuthContext'
import React, { useContext, useState } from 'react'
import ConversationItem from './ConversationItem'
import { Button } from '@material-ui/core'
import redirect from 'nextjs-redirect'

export default function ConversationDashboard({ id, conversations, nextTimestamp }) {
    const account = useContext(FacebookAuthContext)
    const nextUrl = `/conversation/${id}/${nextTimestamp}`;
    const NextRedirect = redirect(nextUrl, {
        statusCode: 200,
    })

    return (conversations.length == 0 && nextTimestamp != -1) ? (<NextRedirect/>) : (
        <div>
            <div> 
                { conversations.map(conversation => { 
                    return (<ConversationItem conversation={conversation}></ConversationItem>); 
                })
                }
            </div>
            <div>
                <Button href={nextUrl}>
                    Next
                </Button>
            </div>
        </div>
    );
    
}