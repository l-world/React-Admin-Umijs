import React from 'react'
import { history, useSelector, useDispatch } from 'umi';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import './BaseLayout.less'
import SideBar from 'components/SideBar';
import CommonHeader from '../components/CommonHeader';
import NotFoundPage from '../pages/404';
import Loading from 'components/Loading';

const BaseLayout = ({ children }) => {
    // 折叠侧边连按钮的状态
    const  { collapse } =  useSelector( state => state.common );
    const { location } = history;
    const routeList = JSON.parse(sessionStorage.getItem('routeList'));
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    
    // 定义一个当前界面的判断函数，
    // 判断当前界面是不是根域下，直接跳转到路由对象的首页面，如果说当前访问的界面没有在路由表内部，直接跳转到404界面
    const isIncludesPage = () => {
        if (location.pathname === '/') {
            // 路由表根据权限返回，返回路由表的第一项内容
            history.replace(routeList[0].route)
            return false;
        }
        return routeList.some(item => item.route === location.pathname);
    }

    //改变侧边栏的宽度展示
    const changeCollapse = () =>  {
        dispatch({
          type:'common/changeCollapse',
          payload:{collapse:!collapse}
        })
      };
    return (
        <Layout>
            <SideBar Sider={Sider} Menu={Menu} collapse={collapse} />
            <Layout>
                <CommonHeader Header={Header} collapse={collapse} changeCollapse={changeCollapse} />
                <Content className='main-content'>
                    { 
                        isIncludesPage() ? 
                            <>
                                <Loading part={true} isShow={ loading.effects['dashboard/initDashboardData'] || loading.effects['attendance/initAttendanceTable'] } />
                                {children}
                            </> : 
                            <NotFoundPage /> 
                    }
                </Content>
            </Layout>
        </Layout>
    )
}

export default BaseLayout