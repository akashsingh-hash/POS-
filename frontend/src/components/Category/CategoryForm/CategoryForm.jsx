import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../../assets/assets'
import toast from 'react-hot-toast'
import { addCategory } from '../../../service/CategoryService'
import { AppContext } from '../../../context/AppContext'

const CategoryForm = () => {
    const {categories,setCategories} = useContext(AppContext);
    const[loading,setLoading] = useState(false)
    const[image,setImage] = useState(false)
    const [data,setData] = useState({
        name:"",
        description : ""
    })

    useEffect(() => {
        console.log(data);
    }
    ,[]
)

    const onChangeHandler = (e) => {
    const { name, value } = e.target; // destructure for brevity
    setData(prevData => ({
        ...prevData,
        [name]: value
    }));
}

    const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!image){
        toast.error("Please select Category Image");
        setLoading(false);
        return; // ✅ stop execution
    }

    const formData = new FormData(); // ✅ Capital F + parentheses
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);

    try {
        const response = await addCategory(formData);
        if(response.status === 201){
            setCategories([...categories, response.data]);
            toast.success("Category Added");
            setData({ name: "", description: "" });
            setImage(null);
        } else {
            toast.error("Not able to Add Category!");
        }
    } catch(error) {
        console.error(error);
        toast.error("Not able to Add Category!");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-12 form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="image" className='form-label'>
                                <img src={image ? URL.createObjectURL(image) : assets.upload} arl= "" width={48}/>
                            </label>
                            <input type="file" name="image" id="image" className='form-control' hidden
                            onChange={e => setImage(e.target.files[0])}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type="text" name="name" id="name" className='form-control' placeholder='User Name'
                            onChange={onChangeHandler}
                            value = {data.name}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea name="description" id="description" className='form-control' 
                            placeholder='User Description ...' rows={8}
                            onChange={onChangeHandler}
                            value={data.description}/>
                        </div>

                        <button type='submit' className='btn btn-warning w-100'
                            disabled={loading}
                        >{loading? "loading..." : "Submit"}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryForm
