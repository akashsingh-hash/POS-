import React from 'react'

const ItemForm = () => {
  return (
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="image" className='form-label'>
                                <img src="https://placehold.co/600x400" arl= "" width={48} height={48}/>
                            </label>
                            <input type="file" name="image" id="image" className='form-control' hidden/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type="text" name="name" id="name" className='form-control' placeholder='Item Name'/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className='form-label'>
                                Category 
                            </label>
                            <select name="category" id="category" className="form-control">
                                <option value = "">--SELECT CATEGORY--</option>
                                 <option value = "category1">SELECT CATEGORY 1</option>
                                 <option value = "category2">SELECT CATEGORY 2</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className='form-label'>
                                Price
                            </label>
                            <input type="number" name="price" id="price" className='form-control'
                            placeholder='&#8377;200.00'/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea name="description" id="description" className='form-control' 
                            placeholder='User Description ...' rows={5}/>
                        </div>

                        <button type='submit' className='btn btn-warning w-100'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemForm
