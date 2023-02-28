import React from 'react';
import { useSelector} from 'umi';
import { Avatar, Menu } from 'antd';
const { SubMenu, Divider, Item } = Menu;
import IconMap from 'components/IconMap';
import defaultAvatar from 'common/imgs/default_avatar.png';

const CommonHeader = ({ Header, collapse, changeCollapse }) => {
    
    const { userInfo }  = useSelector( state => state.user );
    // console.log(userInfo);
    const MenuTitle = (
        <>
            <span>{userInfo.userName}</span>
            <Avatar 
                style={{marginLeft:0}}
                src={ userInfo.avatar || defaultAvatar }
            />
        </>
    )

    // 用户退出
    const signOut = () => {
        sessionStorage.clear();
        window.location.href = '/users/login';
    }
    
    return (
        <Header className="header-wrapper">
            <div className="button" onClick={ changeCollapse }>
                { collapse ? IconMap.rightArrow : IconMap.leftArrow }
            </div>
            <Menu mode='horizontal'>
                <SubMenu key={['1']} title={ MenuTitle } >
                    <Divider />
                        <Item key="4" icon={ IconMap.signOut } onClick={ signOut }>
                            <span>退出</span>
                        </Item>
                </SubMenu>
            </Menu>
        </Header>
    )
}

export default CommonHeader