import React, { useContext, useState } from 'react'
import { AppContext } from '../../../context/AppContext';
import { deleteItem } from '../../../service/ItemService';
import toast from 'react-hot-toast';
import './ItemList.css'

const ItemList = () => {
  const {itemsData,setItemsData, loading} = useContext(AppContext);
  const role = localStorage.getItem('role') || '';
  const isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';

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

  const ItemSkeleton = () => (
    <div className="col-12">
      <div className="card p-3 shadow-sm border-slate-500/10 text-start">
        <div className="d-flex align-items-center">
          <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '8px' }}></div>
          <div className="flex-grow-1 ms-3">
            <div className="skeleton mb-2" style={{ width: '120px', height: '16px' }}></div>
            <div className="skeleton mb-1.5" style={{ width: '80px', height: '12px' }}></div>
            <div className="skeleton" style={{ width: '50px', height: '18px', borderRadius: '50px' }}></div>
          </div>
          <div className="skeleton rounded-full" style={{ width: '30px', height: '30px' }}></div>
        </div>
      </div>
    </div>
  )

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
              loading ? (
                <>
                  <ItemSkeleton />
                  <ItemSkeleton />
                  <ItemSkeleton />
                </>
              ) : filteredItems.length === 0 ? (
                <div className="col-12 text-center py-4 text-slate-500">
                  No items found.
                </div>
              ) : (
                filteredItems.map((item) => {
                  return <div className="col-12" key={item.itemId}>
                    <div className="card p-3 shadow-sm border-slate-500/10">
                      <div className="d-flex align-items-center">
                          <div className="item-image">
                            <img src={item.imgUrl} alt={item.name}/>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 text-[#192837] font-bold">
                              {item.name}
                            </h6>
                            <p className="mb-1 text-slate-500 font-semibold small">
                              Category : {item.categoryName}
                            </p>
                            <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                              &#8377;{item.price}
                            </span>
                          </div>
                          {isAdmin && (
                            <div>
                              <button className='btn btn-danger btn-sm' onClick={() => removeItem(item.itemId)}>
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                })
              )
            }
        </div>
      </div>
    </div>
  )
}

export default ItemList
