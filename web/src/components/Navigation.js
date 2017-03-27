import React, { Component } from 'react'
import './Navigation.css'
import FlatButton from 'material-ui/FlatButton'
import to from '../services/navigate'

const pages = [
  {
    label: 'Services',
    path: 'services'
  },
  {
    label: 'Portfolio',
    path: 'portfolio'
  },
  {
    label: 'Blog',
    path: 'blog'
  },
  {
    label: 'Contact',
    path: 'contact'
  }
]

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation-header">
        {pages.map((def, key) => (
          <FlatButton
            key={key}
            style={{padding: '0 20px', margin: '0 10px'}}
            rippleColor='#fbe923'
            primary={this.props.location.pathname.indexOf(def.path) in [0,1]}
            onClick={() => to(def.path)}>{def.label}</FlatButton>
        ))}
      </div>
    )
  }
}

export default Navigation
