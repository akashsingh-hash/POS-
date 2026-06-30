import React from 'react'
import './ManageItems.css'
import ItemForm from '../../components/Item/ItemForm/ItemForm'
import ItemList from '../../components/Item/ItemList/ItemList'

const ManageItem = () => {
  const role = localStorage.getItem('role') || '';
  const isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';

  return (
    <div className="item-container text-[#192837] relative">
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.78)' }}></div>
      </div>

      {isAdmin && (
        <div className="left-column">
          <ItemForm/>
        </div>
      )}
      <div className="right-column" style={!isAdmin ? { flex: 1 } : {}}>
        <ItemList/>
      </div>
    </div>
  )
}

export default ManageItem
