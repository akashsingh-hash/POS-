import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { deleteItem } from '../../../service/ItemService';
import toast from 'react-hot-toast';
import './ItemList.css'

const ItemList = () => {
  const {itemsData,setItemsData} = useContext(AppContext);

  const [searchState,setSearchState] = useState("");

  const filteredItems = itemsData.filter((item) => {
    return item.name.toLowerCase().includes(searchState.toLowerCase());
  })

  const removeItem = async(id) => {
    try{
      const response = await deleteItem(id);
      if(response.status === 204){
        const updatedItems = itemsData.filter(item => item.itemId !== id);
        setItemsData(updatedItems);
        toast.success("item Deleted Successfully");
      }
      else{
        toast.error("Unable To Delete Item");
      }
    }
    catch(e){
      toast.error("Unable To Delete Item");
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
              filteredItems.map((item) => {
                return <div className="col-12" key={item.itemId}>
                  <div className="card p-3 bg-dark">
                    <div className="d-flex align-items-center">
                        <div className="item-image">
                          <img src={item.imgUrl} alt={item.name}/>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1 text-white">
                            {item.name}
                          </h6>
                            <p className="mb-0 text-white">
                              Category : {item.categoryName}
                            </p>
                            <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                              &#8377;{item.price}
                            </span>
                        </div>
                        <div>
                          <button className='btn btn-danger btn-sm' onClick={() => removeItem(item.itemId)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
              })
            }
        </div>
      </div>
    </div>
  )
}

export default ItemList
