import React, { useContext } from 'react'
import redirect from 'nextjs-redirect'
import MainLayout from './MainLayout'
import { FacebookAuthContext } from '../context/FacebookAuthContext'

export default function MainLayoutAuthenticated({
    children,
    title = 'FB Audio Ripper',
    message = 'Your session has expired or you tried to access an authenticated page without logging in first.',
}) {
    const account = useContext(FacebookAuthContext)
    const LoginRedirect = redirect(`/account/login?message=${message}`, {
        statusCode: 200,
    })
    return !account.isValidSession() ? (
        <LoginRedirect />
    ) : (
        <div>
            <MainLayout title={title}>{children}</MainLayout>
        </div>
    )
}