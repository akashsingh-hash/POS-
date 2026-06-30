import React, { useEffect, useState } from 'react'
import './ManageUsers.css'
import UserForm from '../../components/User/UserForm/UserForm'
import UserList from '../../components/User/UserList/UserList'
import toast from 'react-hot-toast';
import { fetchUsers } from '../../service/UserService'

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error("Unable to fetch Users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="user-container text-[#192837] relative">
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.78)' }}></div>
      </div>

      <div className="left-column">
        <UserForm setUsers={setUsers}/>
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers} loading={loading}/>
      </div>
    </div>
  )
}

export default ManageUser