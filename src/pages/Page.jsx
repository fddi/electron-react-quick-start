import React, { Component } from 'react'
import { Layout, Breadcrumb, Space, Card } from 'antd'
import { HomeOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RoutePage from '../routes/RoutePage';

export default class Page extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        
        const name = '当前页';
        return (
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
        )
    }
}