import axios from 'axios'
import https from 'https'
import {
    getServerSideAccount,
    invalidateServerSideAccount,
} from '../context/FacebookAuthContext'
import NProgress from 'nprogress'

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
    instance.onDownloadProgress = e => {
        const percentage = calculatePercentage(e.loaded, e.total)
        NProgress.set(percentage)
    }
    instance.interceptors.response.use(response => {
        NProgress.done(true)
        return response
    })

    let _data = data;
    try {
        const config = {
            url,
            method,
            data: _data,
        };
        console.log(config); 
        NProgress.start()
        const request = await instance.request(config)
        const data = request.data
        return data
    } catch (e) {
        if (e.response.status == 401) {
            console.error('Account session invalidated.')
            invalidateServerSideAccount(context)
            return {}
        }
        throw e
    }
}