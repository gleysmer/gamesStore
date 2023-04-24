import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostProducts, getGenders, getPlatforms } from "../../redux/actions";
import axios from "axios";
import swal from 'sweetalert'
import "./FormProduc.css";


const FormCreateProduct = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  function goBack() {
    history.goBack();
  }

  const allPlatForm = useSelector((state) => state.platforms);
  const allGenders = useSelector((state) => state.genders);
  const games = useSelector((state) => state.games);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    year: "",
    genderName: [],
    platformName: [],
  });
  const [image, setImage] = useState("");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  ////*upload image

  const handleImage = async (e) => {

    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "game_store");
    await axios
      .post(`https://api.cloudinary.com/v1_1/dwfhsitwe/image/upload`, data)
      .then((response) => setImage(response.data.secure_url));
  };
  /////////
  const [errors, setErrors] = useState({});
  //* validaciones : ///////////////////////////////////////////////

  const validateInput = (form) => {
    let errors = {};
    if (form.name.trim().length > 0) {
      let productExist = games.filter(
        (e) => e.name.toLowerCase() === form.name.toLowerCase()
      );
      if (productExist.length > 0) errors.name = "The title already exists";
    }
    //
    if (!form.name.trim()) {
      errors.name = "Name is required";
    }
    if (!form.description.trim()) {
      errors.description = "Description is required";
    }
    if (!form.year.trim()) {
      errors.year = "Description is required";
    }

    if (!image) {
      errors.image = "Image is required";
    }
    if (!form.price.trim()) {
      errors.price = "Price is required";
    }
    if (!form.stock.trim()) {
      errors.stock = "Stock is required";
    }
    if (selectedPlatforms.length < 1) {
      errors.platformName = "Platform is required";
    }
    if (selectedGenders.length < 1) {
      errors.genderName = "Gender is required";
    }
    return errors;
  };

  const handleBlur = () => {
    setErrors(validateInput(form));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      alert("You must complete all fields!");
    } else {
      const updatedFormData = {
        ...form,
        genderName: selectedGenders,
        platformName: selectedPlatforms,
        image: image,
      };

      dispatch(PostProducts(updatedFormData));
      console.log(updatedFormData);
      alert("a new product has been created");
      goBack();
    }
  };

  useEffect(() => {
    dispatch(getGenders());
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <div className="Cont-form">
      <form className="FormProduct" onSubmit={handleSubmit}>
        <label className="letas" htmlFor="name">
          Name:
        </label>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            className="inputForm"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.name}
          />
          {errors.name && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.name}</p>
          )}
        </div>

        <label className="letas" htmlFor="description">
          Description:
        </label>
        <div>
          <textarea
            id="description"
            name="description"
            className="input-textarea"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.description}
          />
          {errors.description && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.description}
            </p>
          )}
        </div>
        <label className="letas" htmlFor="price">
          Price:
        </label>
        <div>
          <input
            type="number"
            id="price"
            name="price"
            className="inputForm"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.price}
          />
          {errors.price && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.price}</p>
          )}
        </div>
        <label className="letas" htmlFor="image">
          Image:
        </label>
        <div>
          <input
            type="file"
            name="file"
            onBlur={handleBlur}
            onChange={handleImage}
            className="inputImage"
          />
          {errors.image && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.image}</p>
          )}


        </div>
        <label className="letas" htmlFor="stock">
          Stock:
        </label>
        <div>
          <input
            type="number"
            id="stock"
            name="stock"
            className="inputForm"
            onChange={handleChange}
            value={form.stock}
            onBlur={handleBlur}
            min="1"
            pattern="^[0-9]+"
          />
          {errors.stock && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.stock}</p>
          )}
        </div>
        <label className="letas" htmlFor="year">
          Year:
        </label>
        <div>
          <input
            type="number"
            id="year"
            className="inputForm"
            name="year"
            onChange={handleChange}
            value={form.year}
            onBlur={handleBlur}
            min="1"
            pattern="^[0-9]+"
          />
          {errors.year && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errors.year}</p>
          )}
        </div>

        <label htmlFor="genders" className="letas">
          Genders:{" "}
        </label>

        <div className="selects-check">
          {allGenders?.map((gender) => (
            <div key={gender.id} className="genders-options">
              <input
                className="input-platafor"
                key={gender.id}
                type="checkbox"
                id={`gender-${gender.gender}`}
                name="gender"
                value={gender.gender}
                onBlur={handleBlur}
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedGenders([...selectedGenders, gender.gender])
                    : setSelectedGenders(
                      selectedGenders.filter(
                        (selectedGender) => selectedGender !== gender.gender
                      )
                    )
                }
              />
              <label htmlFor={`gender-${gender.id}`} className="label-check">
                {gender.gender}
              </label>
            </div>
          ))}
          {errors.genderName && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {errors.genderName}
            </p>
          )}
        </div>

        <label htmlFor="platforms" className="letas">
          Platforms:
        </label>
        <div className="selects-check">
          {allPlatForm?.map((platform) => (
            <div key={platform.id}>
              <input
                className="input-platafor"
                type="checkbox"
                id={`platform-${platform.id}`}
                name="platform"
                value={platform.name}
                onBlur={handleBlur}
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedPlatforms([
                      ...selectedPlatforms,
                      platform.name,
                    ])
                    : setSelectedPlatforms(
                      selectedPlatforms.filter(
                        (selectedPlatform) =>
                          selectedPlatform !== platform.name
                      )
                    )
                }
              />
              <label
                htmlFor={`platform-${platform.id}`}
                className="label-check"
              >
                {platform.name}
              </label>
            </div>
          ))}
        </div>
        {errors.platformName && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errors.platformName}
          </p>
        )}

        <button className="buttom-enviar-form buton-form " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormCreateProduct;
