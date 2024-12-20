import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { apiEndPoint } from "../api/Endpoint";

const CustomForm = (id) => {
  const initialState = {
    name: "",
    price: 0,
    description: "",
    product_image: "",
  };
  const [value, setValue] = useState(initialState);
  const [imgPath, setImgPath] = useState("");
  const [uploadImage, setUploadImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageId = await handleUploadImage();
      console.log(uploadedImageId, "uppa");
      let fieldData = {
        ...value,
        product_image: [uploadedImageId],
      };
      await axios
        .post(apiEndPoint.addNewProduct, {
          data: fieldData,
        })
        .then((res) => {
          alert("Added Successfully New Product in Our Data ");
          console.log(res.data, "product details");
        });
    } catch (err) {
      console.log("Error", err);
    } finally {
      setValue(initialState);
    }
  };

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    console.log(file, " file");
    if (file) {
      const path = URL.createObjectURL(file);
      console.log(path);
      setImgPath(path);
      setUploadImage(file);
    }
  };

  const handleUploadImage = async () => {
    const imgData = new FormData();
    imgData.append("files", uploadImage);
    try {
      const response = await axios.post(apiEndPoint.uploadedImage, imgData);
      return response.data[0].id;
    } catch (err) {
      console.log("Image is not uploading", err);
    }
  };
  return (
    <div className="container bg-info rounded-4">
      <Form className="p-3" onSubmit={handleSubmit}>
        <h3 className="text-center">Add ME Products</h3>
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="mb-3">
              <label className="form-label">Product Name:</label>
              <input
                type="text"
                className="form-control"
                value={value.name}
                onChange={(e) => {
                  setValue((prev) => ({ ...prev, name: e.target.value }));
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price:</label>
              <input
                type="number"
                className="form-control"
                value={value.price}
                onChange={(e) => {
                  setValue((prev) => ({ ...prev, price: e.target.value }));
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                value={value.description}
                onChange={(e) => {
                  setValue((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                  console.log(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="col-md d-flex flex-column">
            <div className="mb-3">
              <label className="form-label">Upload Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={handleOnChangeImage}
              />
            </div>

            {imgPath && (
              <div className="d-flex rounded-5 gap-4">
                <span className="fs-4 text-start ">Preview Image:</span>
                <img
                  src={imgPath}
                  alt="PreviewImage"
                  className="rounded-5"
                  width="200px"
                  height="200px"
                />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CustomForm;
