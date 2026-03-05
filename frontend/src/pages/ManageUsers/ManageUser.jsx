import React, { useEffect, useState } from 'react'
import './ManageUsers.css'
import UserForm from '../../components/User/UserForm/UserForm'
import UserList from '../../components/User/UserList/UserList'
import toast from 'react-hot-toast';
import {fetchUsers} from '../../service/UserService'

const ManageUser = () => {

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    async function loadUsers() {
      try{
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      }
      catch(error){
        toast.error("Unable to fetch Users");
      }
      finally{
        setLoading(false);
      }
    }
    loadUsers();
  },
[])

  return (
    <div className="user-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers}/>
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers}/>
      </div>
    </div>
  )
}

export default ManageUser