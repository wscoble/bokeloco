import React, { Component } from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo-small.jpg'

class Layout extends Component {
  render() {
    let { navigation, content } = this.props
    return (
      <div>
        <div className="header">
          <Link to="/"><img src={logo} alt="BokeLoco" /></Link>
        </div>
        <div className="navigation">
          {navigation}
        </div>
        <div className="content">
          {content}
        </div>
      </div>
    )
  }
}

export default Layout
