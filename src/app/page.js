"use client"
import React, { useState, useEffect } from 'react'
import { ConfigProvider, Spin, Layout, Card, Row, Button, theme } from 'antd'
import { HomeOutlined, WindowsOutlined, AppstoreOutlined } from '@ant-design/icons';
import Link from 'next/link'
import Env from '../util/Env'
import Image from 'next/image';
import logoReact from '../asset/react.svg'
import logoElectron from '../asset/electron256.png'
import LogoAnt from '../asset/antdesign.svg'
import { CirclePicker } from 'react-color';
import '@/style/main.css';
const { Content } = Layout;
const logoStyle = {
  textAlign: "center",
  height: 80,
  width: 80
}
const antdUrl = "https://ant-design.antgroup.com";
const electronUrl = "https://www.electronjs.org";
const reactUrl = "https://reactjs.org";
export default function Main(props) {
  const [defaultType, setDefaultType] = useState();
  const [loading, setLoading] = useState(false)
  const [themeType, setThemeType] = useState(defaultType)

  useEffect(() => {
    const defaultType = localStorage.getItem("themeType") || "0";
    setDefaultType(defaultType)
  }, [])
  const onChangeComplete = (color, event) => {
    if (color.hex == '#000000') {
      setThemeType('1')
      localStorage.setItem("themeType", "1");
    } else {
      setThemeType('0')
      localStorage.setItem("themeType", "0");
    }
  }

  const onOpenNew = (url) => {
    if (Env.isElectron()) {
      window.electron.openWindow(url);
    } else {
      window.open(url)
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: themeType == '1' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout className="layout-main" >
        <Spin spinning={loading}>
          <Row justify="center" style={{ padding: 8 }}>
            <CirclePicker width={80} colors={["#ffffff", "#000000"]}
              onChangeComplete={onChangeComplete} circleSize={15} circleSpacing={8} />
          </Row>
          <Content className="layout-main">
            <Card className="grid-card">
              <Card.Grid className="grid-item">
                <Link href={
                  {
                    pathname: "/p/conf-demo.html",
                    query: { title: '读取本地配置文件' },
                  }
                } className="grid-link">
                  <HomeOutlined className="grid-icon" />
                  <p>读取本地配置文件</p></Link>
              </Card.Grid>
              <Card.Grid className="grid-item">
                <Link href="/p/dll-demo.html" className="grid-link">
                  <AppstoreOutlined className="grid-icon" />
                  <p>调用DLL动态库</p></Link>
              </Card.Grid>
              <Card.Grid className="grid-item">
                <Link href="/p/open-demo.html" className="grid-link">
                  <WindowsOutlined className="grid-icon" />
                  <p>打开新窗口</p></Link>
              </Card.Grid>
              <Card.Grid className="grid-item" onClick={() => onOpenNew(reactUrl)}>
                <Image src={logoReact} style={logoStyle} alt="logo" />
                <Card.Meta
                  title="React 文档"
                  description={reactUrl}
                />
              </Card.Grid>
              <Card.Grid className="grid-item" onClick={() => onOpenNew(electronUrl)}>
                <Image src={logoElectron} style={logoStyle} alt="logo" />
                <Card.Meta
                  title="Electron 文档"
                  description={electronUrl}
                />
              </Card.Grid>
              <Card.Grid className="grid-item" onClick={() => onOpenNew(antdUrl)}>
                <Image src={LogoAnt} style={logoStyle} alt="logo" />
                <Card.Meta
                  title="Ant-Design 文档"
                  description={antdUrl}
                />
              </Card.Grid>
            </Card>
          </Content>
        </Spin>
      </Layout>
    </ConfigProvider>
  )
}