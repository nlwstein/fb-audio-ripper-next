import React, { useState, createContext } from 'react'
import Cookies from 'universal-cookie'

const FacebookAuthContext = createContext()

function FacebookAuthProvider(props) {
    let [account, setAccountState] = useState({})
    let setAccount = account => {
        const cookies = new Cookies()
        cookies.set('account', JSON.stringify(account), { path: '/' })
        setAccountState(account)
    }
    let getAccount = () => {
        let cookies = new Cookies(
            typeof window === 'undefined' ? props.headers : null
        )
        return cookies.get('account') || {}
    }

    let isValidSession = () => {
        let _account = getAccount()

        // TODO: Improve login mecahanism to actually test session / compare against expiry time:
        return _account.appstate !== undefined
    }

    return (
        <FacebookAuthContext.Provider
            value={{
                account: props.account,
                setAccount: setAccount,
                getAccount: getAccount,
                isValidSession: isValidSession,
            }}
        >
            {props.children}
        </FacebookAuthContext.Provider>
    )
}

function invalidateServerSideAccount(context) {
    context.res.setHeader(
        'Set-Cookie',
        'account=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    )
}

function getServerSideAccount(context) {
    let cookies = new Cookies(
        typeof window === 'undefined' ? context.req.headers.cookie : null
    )
    return cookies.get('account') || {}
}

export {
    FacebookAuthContext,
    FacebookAuthProvider,
    getServerSideAccount,
    invalidateServerSideAccount,
}