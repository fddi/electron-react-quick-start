import React, { Component } from 'react'
import { ConfigProvider, Layout, Breadcrumb, Card, theme } from 'antd'
import { HomeOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RoutePage from '../router/RoutePage';

export default function Page(props) {
    const name = '当前页';
    const defaultType = localStorage.getItem("themeType") || "0";
    return (<ConfigProvider
        theme={{
            algorithm: defaultType == '1' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
    >
        <Layout>
            <Breadcrumb style={{ marginTop: 15, marginLeft: 15 }} separator=">">
                <Breadcrumb.Item>
                    <Link to="/" style={{ color: '#555' }}>  <HomeOutlined />首页</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{name}</Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ margin: 10 }}>
                <RoutePage />
            </Card>
        </Layout>
    </ConfigProvider>
    )
}