import React from 'react'

const CustomerForm = ({customerName,setCustomerName,mobileNumber,setMobileNumber}) => {
  return (
    <div className="p-2">
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className='col-4'>Customer Name</label>
          <input type="text" name="" id="customerName" className="form-control from-control-sm" 
            placeholder='Enter Name'
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}/>
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="mobileNumber" className='col-4'>Mobile Number</label>
          <input type="text" name="" id="mobileNumber" className="form-control from-control-sm" 
            placeholder='Enter Mobile Number'
            onChange={e => setMobileNumber(e.target.value)}
            value = {mobileNumber}/>
        </div>
      </div>
    </div>
  )
}

export default CustomerForm
