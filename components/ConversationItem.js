import {FacebookAuthContext } from '../context/FacebookAuthContext'
import React, { useContext, useState } from 'react'
import { Button, TextField } from "@material-ui/core";
import { Card, CardActions, CardMedia } from '@material-ui/core';
import Link from 'next/link';
export default function ConversationItem({ conversation }) {
    if (conversation.body) {
        return (<Card>{conversation.timestamp} | {conversation.sender}: {conversation.body}</Card>)
    } 
    if (conversation.url) {
        return (<Card>
            <CardMedia>
                <audio controls>
                    <source src={conversation.url} type="audio/mpeg"/>
                </audio> 
                <Link href={conversation.url}>Download</Link>
            </CardMedia>
        </Card>)
    }

    return <Card>Unexpected Error!</Card>
}