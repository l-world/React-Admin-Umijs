export const selectLayout = pathname => {
    return pathname.includes('/user') ? 'LoginLayout' :'BaseLayout'
}

