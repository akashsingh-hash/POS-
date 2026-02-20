import React from 'react'
import './ManageItems.css'
import ItemForm from '../../components/Item/ItemForm/ItemForm'
import ItemList from '../../components/Item/ItemList/ItemList'

const ManageItem = () => {
  return (
    <div className="item-container text-light">
      <div className="left-column">
        <ItemForm/>
      </div>
      <div className="right-column">
        <ItemList/>
      </div>
    </div>
  )
}

export default ManageItem
