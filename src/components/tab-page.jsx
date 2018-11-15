import React, { Component } from 'react'
import Loadable from 'react-loadable'
import Login from '../pages/login'
let LoadableComponent
export default class TabPage extends Component {
     constructor(props) {
          super(props)
          LoadableComponent = Loadable({
               loader: () => import('../pages/404'),
               loading: Login,
          })
          this.state = {
               menu: props.menu,
               component: LoadableComponent
          }
     }

     render() {
          console.log(this.props.menu)
          console.log(this.state.component)
          return (
               <div><LoadableComponent />
               </div>
          );
     }
}
