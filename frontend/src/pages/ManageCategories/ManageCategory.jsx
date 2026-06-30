import React from 'react'
import './ManageCategory.css'
import CategoryForm from '../../components/Category/CategoryForm/CategoryForm'
import CategoryList from '../../components/Category/CategoryList/CategoryList'

const ManageCategory = () => {
  return (
    <div className="category-container text-[#192837] relative">
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.78)' }}></div>
      </div>

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
