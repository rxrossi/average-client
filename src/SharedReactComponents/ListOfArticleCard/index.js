import React from 'react'
import Card from '../ArticleCard'
import './css.css'

export default ({ articles, small, handleDelete }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      className="clearfix"
      style={{
        // backgroundColor: "#ddd",
        textAlign: 'center',
        position: 'relative',
        maxWidth: '968px',
        margin: 'auto',
        padding: '5px 0'
      }}
    >
      {articles.map(article => {
        return (
          <Card
            small={small}
            handleDelete={handleDelete}
            key={article.link}
            article={article}
          />
        )
      })}
    </div>
  </div>
)
