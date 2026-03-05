import React, { useState } from 'react'
import './UserForm.css'
import { addUser } from '../../../service/UserService';
import toast from 'react-hot-toast';

const UserForm = ({setUsers}) => {

    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        name: "",
        email : "",
        password: "",
        role:"ROLE_USER"
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]:value
        });
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await addUser(data);
            setUsers((prevUsers) => [
                ...prevUsers,response.data
            ]);
            toast.success("User Added Successfully");
            //  clear the form 
            setData({
                name : "",
                email : "",
                password: "",
                role:"ROLE_USER"
            })
        }
        catch(error){
            toast.error("Error Adding User");
        }
        finally{
            setLoading(false);
        }
    }


  return (
    <div className="mx-2 mt-2">
        <div className="row">
            <div className="card col-md-12 form-container">
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type="text" name="name" id="name" className='form-control' placeholder='John Doe'
                            value={data.name}
                            onChange={onChangeHandler}
                            />
                        </div>

                       <div className="mb-3">
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type="email" name="email" id="email" className='form-control' 
                            placeholder='yourname@example.com'
                            value={data.email}
                            onChange={onChangeHandler}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor='password' className='form-label'>password</label>
                            <input type="password" name="password" id="password" className='form-control' 
                            placeholder='***************'
                            value={data.password}
                            onChange={onChangeHandler}/>
                        </div>

                        <button type='submit' className='btn btn-warning w-100'
                        disabled={loading}>
                            {loading ? "Loading.." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserForm
