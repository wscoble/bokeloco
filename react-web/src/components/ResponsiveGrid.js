import React, { Component } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

let Grid = WidthProvider(Responsive)

const breakpoints = {xxl: 1900, xl: 1400, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}
const cols = {xxl: 16, xl: 14, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}

class ResponsiveGrid extends Component {
  render() {
    return (
      <Grid className="layout" layouts={this.props.layouts} breakpoints={breakpoints} cols={cols}>
        {this.props.children}
      </Grid>
    )
  }
}

export default ResponsiveGrid
