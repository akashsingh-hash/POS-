import React, { useContext, useState } from 'react'
import './CategoryList.css'
import { AppContext } from '../../../context/AppContext'
import { deleteCategory } from '../../../service/CategoryService'
import toast from 'react-hot-toast'

const CategoryList = () => {
  const {categories,setCategories}= useContext(AppContext)
  const [searchState,setSearchState] = useState("")

  const filterCategories = categories.filter(category =>
  category.name?.toLowerCase().includes(searchState.toLowerCase())
)

  const deleteByCategoryId = async (categoryId) => {
    try{
      const response = await deleteCategory(categoryId);
      if(response.status == 204){
        const updatedCategory = categories.filter(category => category.categoryId != categoryId);
        setCategories(updatedCategory);
        //  display a toast message 
        toast.success("Category Deleted")
      }
      else{
        //  display error toast message 
        toast.error("Unable to delete the category ")
      }
    }
    catch(error){
      console.error(error);
      //  display error toast message 
      toast.error("Unable to delete the category ")
    }
  }


  return (
    <div>
      <div className="category-list-container" >
        
        <div className="row pe-2">
          <div className="input-group mb-3">
            <input type="text" name="keyword" id="keyword" placeholder='Search for keyword'
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
              filterCategories.map((category,index) => {
                return (
                  <div key={index} className="col-12">
                  <div className="card p-3 bg-black">
                    <div className="d-flex align-items-center">
                        <div className = 'image-div' style={{marginRight:'15px'}}>
                          <img src={category.imgUrl} alt={category.name} className='category-image'/>
                        </div>

                        <div className="flex-grow-1">
                          <h5 className='mb-1 text-white'>{category.name}</h5>
                          <p className='mb-0 text-white'>{category.items} Items</p>
                        </div>

                        <div>
                          <button className="btn btn-danger btn-sm"
                          onClick={() => deleteByCategoryId(category.categoryId)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>

                    </div>
                  </div>
                </div>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default CategoryList
