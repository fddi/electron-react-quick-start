import React, { Fragment } from 'react'
import '@/style/main.css';
import { Layout } from 'antd';

export default function App({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}