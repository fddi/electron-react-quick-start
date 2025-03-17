import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { App } from 'antd';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <App>
            {children}
          </App>
        </AntdRegistry>
      </body>
    </html>
  )
}