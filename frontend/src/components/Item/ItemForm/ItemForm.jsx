import React, { useContext, useState } from 'react'
import {assets} from '../../../assets/assets'
import { AppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';
import { addItem } from '../../../service/ItemService';

const ItemForm = () => {
    const {categories,setItemsData,itemsData,setCategories} = useContext(AppContext);

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        categoryId:"",
        price:"",
        description:""
    });
    const [loading,setLoading] = useState(false);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(prev => ({
    ...prev,
    [name]: value
}));
    };

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append("item",JSON.stringify(data));
            formData.append("file",image);
            try{
                if(!image){
                    toast.error("Selct Image");
                    return;
                }
                const response = await addItem(formData);
                if(response.status === 201){
                    setItemsData([...itemsData,response.data]);
                    //  TODO update the category state 
                    setCategories((prev) =>
                        prev.map((category) => category.categoryId === data.categoryId ? {...category,items:category.items+1}:category)
                    )
                    toast.success("Item added");
                    setData({
                        name:"",
                        categoryId:"",
                        price:"",
                        description:""
                    })
                    setImage(false)
                }
                else{
                    toast.error("Unable to add Item.");
                }
            }
            catch(error){
                toast.error("Unable to add Item.");
            }
        }
        catch(error){
            toast.error("Unable to add Item.");
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-8 form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className='form-label'>
                                <img src={image?URL.createObjectURL(image):assets.upload} arl= "" width={48} height={48}/>
                            </label>
                            <input type="file" name="image" id="image" className='form-control' hidden
                            onChange={e => setImage(e.target.files[0])}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type="text" name="name" id="name" className='form-control' placeholder='Item Name'
                            value={data.name}
                            onChange={onChangeHandler}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className='form-label'>
                                Category 
                            </label>
                            <select name="categoryId" id="category" className="form-control"
                            value={data.categoryId}
                            onChange={onChangeHandler}>
                                <option value = "">--SELECT CATEGORY--</option>
                                {categories.map((category) => 
                                    <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                                )}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className='form-label'>
                                Price
                            </label>
                            <input type="number" name="price" id="price" className='form-control'
                            placeholder='&#8377;200.00'
                            value={data.price}
                            onChange={onChangeHandler}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea name="description" id="description" className='form-control' 
                            placeholder='User Description ...' rows={5}
                            value={data.description}
                            onChange={onChangeHandler}/>
                        </div>

                        <button type='submit' className='btn btn-warning w-100'
                        disabled={loading}>
                            {loading?"Loading..":"Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemForm
