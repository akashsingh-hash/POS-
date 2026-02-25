import React, { useState } from 'react'
import './UserList.css'
import { deleteUser } from '../../../service/UserService';
import toast from 'react-hot-toast';

const UserList = ({users,setUsers}) => {

  const [searchState,setSearchState] = useState("");

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchState.toLowerCase())
  })

  const deleteByUserId = async (id) => {
    try{
      await deleteUser(id);
      setUsers((prevState) => prevState.filter(user => user.userID !== id));
      toast.success("User Deleted Successfully");
    }
    catch(e){
      toast.error("User Deletion Failed.")
    }
  }

  return (
    <div>
      <div className="category-list-container" >
        
        <div className="row pe-2">
          <div className="input-group mb-3">
            <input type="text" 
            name="keyword" 
            id="keyword" 
            placeholder='Search for keyword'
            className='form-control'
            onChange={e => setSearchState(e.target.value)}
            value={searchState}/>
            <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
          </div>
        </div>
        <div className="row g-3 pe-2">
            {
            filteredUsers.map(
              (user) => (
                <div key={user.userID} className='col-12'>
                  <div className="card p-3 bg-dark">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h5 className='mb-1 text-white'>
                          {user.name}
                        </h5>
                        <p className="mb-0 text-white">
                          {user.email}
                        </p>

                      </div>
                      <div>
                        <button className='btn btn-danger btn-sm'
                        onClick={() => deleteByUserId(user.userID)}>
                          <i className="bi bi-trash">
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
            }
        </div>
      </div>
    </div>
  )
}

export default UserList
