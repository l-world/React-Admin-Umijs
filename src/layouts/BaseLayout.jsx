import React from 'react'
import { Layout,Menu } from 'antd';
const { Header,Sider, Content } = Layout;
import SideBar from 'components/SideBar';
import './BaseLayout.less'

const BaseLayout = ({ children }) => {
    return (
        <Layout>
           <SideBar Sider={Sider} Menu={Menu}/>
            <Layout>
                <Header >Header</Header>
                <Content >{children}</Content>
            </Layout>
        </Layout>
    )
}

export default BaseLayout