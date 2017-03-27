import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

// assets

import './Article.css'

// theme

const paperStyle = {
  maxWidth: '1200px',
  width: '80%',
  margin: '0 auto',
  marginBottom: '1em',
  padding: '1em'
}

// component

class Article extends Component {
  render() {
    let { title, body } = this.props
    return (
      <Paper style={paperStyle}>
        <h2>{title}</h2>
        <span>{body}</span>
      </Paper>
    )
  }
}

class ArticleSummary extends Component {
  render() {
    let { title, summary } = this.props
    return (
      <Paper style={paperStyle}>
        <h2>{title}</h2>
        <span>{summary}</span>
      </Paper>
    )
  }
}

export default Article
export { ArticleSummary }
