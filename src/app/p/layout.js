"use client"
import React, { useState, useEffect } from 'react'
import { ConfigProvider, Layout, Breadcrumb, Card, theme } from 'antd'
import { HomeOutlined, } from '@ant-design/icons';
import Link from 'next/link'

export default function Page({ children }) {
    const [name, setName] = useState('当前页');
    const [defaultType, setDefaultType] = useState();
    useEffect(() => {
        const defaultType = localStorage.getItem("themeType") || "0";
        setDefaultType(defaultType)
    }, [])
    return (<ConfigProvider
        theme={{
            algorithm: defaultType == '1' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
    >
        <Layout style={{ padding: 15 }}>
            <Breadcrumb
                items={[
                    {
                        title: <Link href="/" style={{ color: '#555' }}>  <HomeOutlined />首页</Link>,
                    },
                    {
                        title: name
                    },
                ]}
            />
            <Card style={{ margin: 10 }}>
                {children}
            </Card>
        </Layout>
    </ConfigProvider>
    )
}