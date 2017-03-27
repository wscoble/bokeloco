import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import ResponsiveGrid from '../components/ResponsiveGrid'
import injectAws from '../services/injectAws'

// assets

import './Home.css'

// component

const layouts = {
  xxl: [
    {i: 'a', x: 3, y: 0, w: 5, h: 3, static: true},
    {i: 'b', x: 8, y: 0, w: 5, h: 3, static: true}
  ],
  xl: [
    {i: 'a', x: 2, y: 0, w: 5, h: 3, static: true},
    {i: 'b', x: 7, y: 0, w: 5, h: 3, static: true}
  ],
  lg: [
    {i: 'a', x: 1, y: 0, w: 5, h: 3, static: true},
    {i: 'b', x: 6, y: 0, w: 5, h: 3, static: true}
  ],
  md: [
    {i: 'a', x: 0, y: 0, w: 5, h: 3, static: true},
    {i: 'b', x: 5, y: 0, w: 5, h: 3, static: true}
  ],
  sm: [
    {i: 'a', x: 1, y: 0, w: 4, h: 3, static: true},
    {i: 'b', x: 1, y: 3, w: 4, h: 3, static: true}
  ],
  xs: [
    {i: 'a', x: 0, y: 0, w: 6, h: 3, static: true},
    {i: 'b', x: 0, y: 3, w: 6, h: 3, static: true}
  ]
}

class Home extends Component {
  render() {
    return (
      <ResponsiveGrid layouts={layouts}>
        <div key={'a'} className="main">
          <Paper style={{width: '100%', height: '100%', padding: '1em'}}>
            Home 1
          </Paper>
        </div>
        <div key={'b'} className="main">
          <Paper style={{width: '100%', height: '100%', padding: '1em'}}>
            Home 2
          </Paper>
        </div>
      </ResponsiveGrid>
    )
  }
}

export default injectAws(Home)
