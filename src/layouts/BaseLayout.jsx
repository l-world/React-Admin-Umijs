import React from 'react'
import { Layout,Menu} from 'antd';
const { Header,Sider, Content } = Layout;
import './BaseLayout.less'
import SideBar from 'components/SideBar';
import CommonHeader from '../components/CommonHeader';

const BaseLayout = ({ children }) => {
    // 折叠侧边连按钮的状态
    const [collapse, setCollapse] =React.useState(false);
    //改变侧边栏的宽度展示
   const changeCollapse = () => setCollapse(!collapse);
    return (
        <Layout>
           <SideBar Sider={Sider} Menu={Menu} collapse={collapse}/>
            <Layout>
                <CommonHeader Header={Header} collapse={collapse}  changeCollapse={changeCollapse}/>
                <Content >{children}</Content>
            </Layout>
        </Layout>
    )
}

export default BaseLayout