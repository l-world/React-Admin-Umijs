import React, { useState, useEffect } from 'react';
import { Upload, Modal,message } from 'antd';
import $http from 'api';

/*
 * 前端直传
 * 七牛云存储（对象存储）
 * token值(七牛与前端的token值)
 */
const UploadComponent = ({ avatar, getNewAvatar }) => {

    const [token, setToken] = useState('');
    const [fileList, setFileList] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        if (avatar) {
          setFileList([{ url: avatar }]);
          setPreviewImg(avatar);
        }
        _getToken();
      }, []);

    // 图片预览处理函数
    const handlePreview = () => {
        setIsShowModal(true)
    }

    // 处理预览关闭
    const handlePreClose = () => {
        setIsShowModal(false);
    }

    // 图片发生改变
    const handleChange = (info) => {
        setFileList(info.fileList);
        if(info.file.status === 'done'){
            setPreviewImg('//' + info.file.response.url);
            getNewAvatar('//' + info.file.response.url);
            if(previewImg || avatar){
                _deletePreviewImg();
            }
        }
    }

    // 删除之前的图片
    const _deletePreviewImg = async () => {
        const res = await $http.deleteFile({
            bucket: 'oa-demo',
            fileName: previewImg ? previewImg : avatar,
            accessKey: '8QQD0qX3ER_tMNfKMeYfueFECLJW1Zyg7zExska0', //- 公钥
            secretKey: 'T4fa8ULII7kOxqv9oCDRGhC3zb37vSKnXPtFYPQk', //- 私钥
        })
        if( !res.data ) return message.error(res.msg)
    }

    const _getToken = async () => {
        const { data } = await $http.getUploadToken({
            bucket: 'oa-demo',
            uploadUrl: 'r3l03lzeo.hd-bkt.clouddn.com',
            accessKey: '8QQD0qX3ER_tMNfKMeYfueFECLJW1Zyg7zExska0', //- 公钥
            secretKey: 'T4fa8ULII7kOxqv9oCDRGhC3zb37vSKnXPtFYPQk', //- 私钥
        })
        setToken(data);
    }

    return (
        <>
            <Upload
                maxCount={1}
                action="https://up-z0.qiniup.com/"
                listType="picture-card"
                fileList={fileList}
                data={{ token }}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                选择图片
            </Upload>
            <Modal
                open={isShowModal}
                footer={null}
                closable={false}
                onCancel={handlePreClose}
            >
                <img src={previewImg} style={{width:'100%'}} />
            </Modal>
        </>
    )
}

export default UploadComponent