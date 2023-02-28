import React, { useState } from 'react'
import { useDispatch, useSelector } from 'umi'
import { Form, Input, Button, Row, Col } from 'antd'
import AccountLogin from './component/AccountLogin'
import SmCodeLogin from './component/SmCodeLogin'
import IconMap from 'components/IconMap';
import LogoImg from 'common/imgs/logo.svg';
import './css/login.less'

const FormItem = Form.Item;

const login = ( { history } ) => {

    const [form] = Form.useForm();
    const [type, setType] = useState(0);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);

    const submitUserInfo = (data) => {
        dispatch({ type: "user/login", payload: { ...data, type } })
    }

    const componentSelector = props => !type ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />;

    return (
        <div className='form'>
            <div className="logo">
                <img src={LogoImg} alt="logo" />
                <span>人事管理系统</span>
            </div>
            <Form form={form} onFinish={submitUserInfo}>
                {componentSelector({ form, FormItem, Input })}
                <Row>
                    <Button 
                        block={true}
                        type='primary'
                        htmlType='submit'
                        loading={loading.effects['user/login']}
                    >
                        登录
                    </Button>
                </Row>
                <Row className='ft-12'>
                    <Col span={6}>
                        <p
                            className="login-methods-container"
                            onClick={() => history.push('/users/forgetPassword')}
                        >
                            忘记密码？
                        </p>
                    </Col>
                    <Col span={18} className="align-right" onClick={() => setType(!type ? 1 : 0)}>
                        {
                            !type ? "使用手机验证码登录" : "使用账号密码登录"
                        }
                        {IconMap.arrowRight}
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default login