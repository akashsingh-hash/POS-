import React from 'react'
import './ManageUsers.css'
import UserForm from '../../components/User/UserForm/UserForm'
import UserList from '../../components/User/UserList/UserList'

const ManageUser = () => {
  return (
    <div className="user-container text-light">
      <div className="left-column">
        <UserForm/>
      </div>
      <div className="right-column">
        <UserList/>
      </div>
    </div>
  )
}

export default ManageUser