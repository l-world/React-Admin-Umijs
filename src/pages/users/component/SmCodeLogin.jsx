import React from 'react'
import IconMap from 'components/IconMap';
import { Button,message } from 'antd'
import { loginRule } from 'utils/rules';
import $http from 'api'
const countDown = 60;
const SmCodeLogin = ({ FormItem, Input,form }) => {

    const [disabled,setDisabled] = React.useState(true);
    let [currentTime,setCurrentTime] = React.useState(countDown);
    const [currentStatus,setCurrentStatus] = React.useState(true);

    /* 检测手机号码是否验证成功 */
    const checkMobile = async (val) => {
        //获取手机验证的结果
        try {
            const data = await form.validateFields(['mobile']);
            setDisabled(false);
        } catch (error) {
            setDisabled(true);
        }
    }

    // 发送验证码
    const sendSmCode = async () => {
        setCurrentStatus(false);
        // 获取当前用户输入的手机号码
        const mobile = form.getFieldValue('mobile');
        const res = await $http.getSmCode({ mobile });
        message.success(res.msg);
        console.log(res,'sendSmCode=====');
        setDisabled(true);
        //倒计时
        runTime();
    }

    const runTime = () => {
        const timer = setInterval( () => {
            if(currentTime <= 0) {
                clearInterval(timer);
                setCurrentStatus(true);
                setDisabled(false);
                setCurrentTime(countDown);
                return;
            }
            setCurrentTime(--currentTime);
        },1000)
    }

    return (
        <>
            <FormItem name="mobile" rules={loginRule.mobileRule} hasFeedback>
                <Input
                    placeholder="请输入手机号"
                    prefix={IconMap.mobileIcon}
                    onChange={ checkMobile }
                />
            </FormItem>
            <FormItem name="code" rules={loginRule.codeRule} hasFeedback>
                <Input
                    placeholder="请输入验证码"
                    prefix={IconMap.codeIcon}
                    addonAfter={<Button onClick={ sendSmCode } disabled={disabled}  >
                        {
                            currentStatus ? "发送验证码" : `${currentTime}秒后重新发送`
                        }
                    </Button>}
                />
            </FormItem>
        </>
    )
}

export default SmCodeLogin