import React, {useState} from "react";
import CustomModal from "../../helperComponent/customModal";

const AddProductModal = ({ isOpen, onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    // console.log( e.target.files[0]);
    const file = e.target.files[0];
    if (file && (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png")) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const onOkClick = () => {
    // TODO: Handle form submission, API FOR ADDING Product

    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} onOk={onOkClick} title={"Add Your Products here.."}>
      <div className="space-y-4 my-4">
        {/* Name Input */}
        <div>
          <label htmlFor="categoryName" className="block text-left text-lg font-medium text-gray-700">
            Name:
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1"
          />
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="categoryPrice" className="block text-left text-lg font-medium text-gray-700">
            Price:
          </label>
          <input
            id="categoryPrice"
            type="number"
            placeholder="Enter category price"
            className="mt-1 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1"
          />
        </div>

        {/* Thumbnail Input */}
        <div>
          <label htmlFor="categoryThumbnail" className="block text-left text-lg font-medium text-gray-700">
            Thumbnail:
          </label>
          <input
            id="categoryThumbnail"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="mt-1 block w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Preview Image */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Thumbnail Preview:</p>
            <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg border" />
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default AddProductModal;
