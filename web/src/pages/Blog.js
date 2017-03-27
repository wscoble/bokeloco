import React, { Component } from 'react'
import { ArticleSummary } from './Article'
import Paper from 'material-ui/Paper'

// assets

import './Blog.css'
import articles from '../content/blog'

// component

class Blog extends Component {
  render() {
    return (
      <div className='Blog-wrapper'>
        {articles.map((article, key) => <ArticleSummary key={key} {...article} />)}
      </div>
    )
  }
}

export default Blog
