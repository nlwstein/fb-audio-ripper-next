import axios from 'axios'
import https from 'https'
import {
    getServerSideAccount,
    invalidateServerSideAccount,
} from '../context/FacebookAuthContext'

export default async function fbripapi({
    method = 'GET',
    data = {},
    url = '',
    appstate = null,
    context = null,
}) {
    if (appstate == null) {
        appstate = getServerSideAccount(context).appstate
    }
    data.appstate = appstate; 
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        })
    })
    let _data = data;
    try {
        const config = {
            url,
            method,
            data: _data,
        };
        console.log(config); 
        const request = await instance.request(config)
        const data = request.data
        return data
    } catch (e) {
        console.log(e); return;
        if (e.response.status == 401) {
            console.error('Account session invalidated.')
            invalidateServerSideAccount(context)
            return {}
        }
        throw e
    }
}