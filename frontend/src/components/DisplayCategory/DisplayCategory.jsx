import React from 'react'
import Category from '../ExploreCategory/Category'

const DisplayCategory = ({categories,selectedCategory,setSelectedCategory}) => {
  return (
    <div className="row g-3" style={{width:"100%", margin:0}}>
      {
        categories.map(category => (
          <div key={category.categoryId} className="col-md-3 col-sm-6 d-flex gap-3" style={{padding:'0 10px'}}>
            <Category
              categoryName = {category.name}
              imgUrl = {category.imgUrl}
              numberOfItems = {category.items}
              isSelected={selectedCategory === category.categoryId}
              onClick={() => setSelectedCategory(category.categoryId)}
            />
          </div>
        ))
      }

    </div>
  )
}

export default DisplayCategory
