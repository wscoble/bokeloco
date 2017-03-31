import React, { Component } from 'react'

// assets

import './Portfolio.css'

// component

class Portfolio extends Component {
  render() {
    return (
      <p>Portfolio</p>
    )
  }
}

class PortfolioItem extends Component {
  render() {
    return (
      <p>PortfolioItem {this.props.params.entryId}</p>
    )
  }
}

export default Portfolio
export { PortfolioItem }
