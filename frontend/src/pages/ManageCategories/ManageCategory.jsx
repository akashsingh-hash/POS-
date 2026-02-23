import React from 'react'
import './ManageCategory.css'
import CategoryForm from '../../components/Category/CategoryForm/CategoryForm'
import CategoryList from '../../components/Category/CategoryList/CategoryList'

const ManageCategory = () => {
  return (
    <div className="category-container text-light">
      <div className="left-column">
        <CategoryForm/>
      </div>
      <div className="right-column">
        <CategoryList/>
      </div>
    </div>
  )
}

export default ManageCategory
