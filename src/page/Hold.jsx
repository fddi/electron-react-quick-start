import React from 'react'
import { Spin } from 'antd'

export default function (props) {
     return (
          <div style={{ paddingTop: 200, width: "100%", height: "100%", background: '#fff', textAlign: 'center' }}>
               <Spin />
          </div>
     );
}