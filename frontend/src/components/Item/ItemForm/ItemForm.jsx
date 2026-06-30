import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { addItem } from '../../../service/ItemService';
import toast from 'react-hot-toast';
import { assets } from '../../../assets/assets';

const ItemForm = () => {
  const { categories, itemsData, setItemsData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.categoryId) {
      toast.error("Please fill in all required fields (Name, Price, Category)");
      return;
    }

    if (!image) {
      toast.error("Please select an item image");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    // Wrap item fields in the JSON object format expected by ItemController
    // Send as application/json Blob to prevent Spring Boot @RequestPart Content-Type mismatches
    const itemBlob = new Blob([JSON.stringify({
      name: data.name,
      price: parseFloat(data.price),
      categoryId: data.categoryId,
      description: data.description
    })], { type: 'application/json' });
    formData.append("item", itemBlob);
    formData.append("file", image);

    try {
      const response = await addItem(formData);
      if (response.status === 201) {
        setItemsData([...itemsData, response.data]);
        toast.success("Item Added Successfully!");
        setData({ name: "", price: "", categoryId: "", description: "" });
        setImage(null);
      } else {
        toast.error("Failed to add item");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card glass-card col-md-12 p-3">
          <div className="card-body">
            <h4 className="mb-4 text-gradient">Add New Product Item</h4>
            
            <form onSubmit={onSubmitHandler}>
              {/* Image Upload Box */}
              <div className="mb-3 text-center">
                <label htmlFor="image" className="form-label d-block text-start text-[#192837] font-semibold">Product Image *</label>
                <label htmlFor="image" className="d-inline-block p-2 rounded cursor-pointer animate-pulse" style={{ border: '2px dashed var(--glass-border)', background: 'rgba(25, 40, 55, 0.05)' }}>
                  <img 
                    src={image ? URL.createObjectURL(image) : (assets.upload || "https://placehold.co/100x100?text=Upload")} 
                    alt="Upload Preview" 
                    style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </label>
                <input 
                  type="file" 
                  name="image" 
                  id="image" 
                  className="form-control" 
                  hidden 
                  onChange={e => setImage(e.target.files[0])}
                />
              </div>

              {/* Item Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-[#192837] font-semibold">Item Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  className="form-control glass-input" 
                  placeholder="e.g. Double Cheeseburger" 
                  onChange={onChangeHandler}
                  value={data.name}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="mb-3">
                <label htmlFor="categoryId" className="form-label text-[#192837] font-semibold">Category *</label>
                <select 
                  name="categoryId" 
                  id="categoryId" 
                  className="form-control glass-input"
                  onChange={onChangeHandler}
                  value={data.categoryId}
                  required
                >
                  <option value="">-- SELECT CATEGORY --</option>
                  {categories.map((cat) => (
                    <option key={cat.categoryId} value={cat.categoryId}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mb-3">
                <label htmlFor="price" className="form-label text-[#192837] font-semibold">Price (₹) *</label>
                <input 
                  type="number" 
                  step="0.01"
                  name="price" 
                  id="price" 
                  className="form-control glass-input" 
                  placeholder="249.00"
                  onChange={onChangeHandler}
                  value={data.price}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="form-label text-[#192837] font-semibold">Description</label>
                <textarea 
                  name="description" 
                  id="description" 
                  className="form-control glass-input" 
                  placeholder="Enter details about this product..." 
                  rows={4}
                  onChange={onChangeHandler}
                  value={data.description}
                />
              </div>

              <button type="submit" className="btn btn-glow w-100 py-2.5" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
