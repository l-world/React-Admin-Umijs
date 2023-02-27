import React from 'react'
import {selectLayout} from 'utils/selectLayout'
import BaseLayout from './BaseLayout'
import LoginLayout from './LoginLayout'
import Loading  from '../components/Loading'
import { useSelector } from 'umi'

const Layout = ({children,location}) => {
    const layoutMap = {BaseLayout,LoginLayout};
    const loading = useSelector( state => state.loading);
    const Container = layoutMap[ selectLayout(location.pathname) ]
    return (
        <Container>
            <Loading isShow={loading.effects['user/login']} />
            {children}
        </Container>
    )
}

export default Layout