import React, { useContext, useState, useRef, useEffect } from "react";
import { AiOutlineCheck, AiOutlineCloudUpload } from "react-icons/ai";
import { GetColorName} from 'hex-color-to-color-name';
import { BsNodePlus } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { collection, query, where, getDocs, doc, limit , setDoc, addDoc, updateDoc  } from "firebase/firestore";
import { AdminContext } from "../AdminContext";
import { db, storage } from "../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./form.css";
function AddEditProduct() {
  const { openProForm, setOpenProForm, categories } = useContext(AdminContext);
  const [title, setTitle] = useState("");
  const [roome, setRoome] = useState("");
  const [cat, setCat] = useState("");
  const [oldCat, setOldCat]= useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("none");
  const [qua, setQua] = useState("");
  const [oldQua, setOldQua] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState("none");
  const [color, setColor] = useState("transparent");
  const [hexColor, setHexColor] = useState("");
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [imageErr, setImageErr] = useState(null);
  const [prg, setPrg] = useState(null);
  const [imgInd, setImgInd] = useState(0);
  const imageRef = useRef();
  const colorInp= useRef();
  function closeForm() {
    setPrg(null);
    setOpenProForm({ open: false, item: null });
    setTitle("");
    setCat("");
    setOldCat('');
    setRoome("");
    setPrice("");
    setDiscount("none");
    setQua("");
    setOldQua('')
    setDesc("");
    setCapacity("none");
    setColor("transparent");
    setImages([]);
    setImagesUrl([])
  }
  useEffect(() => {
    const product = openProForm.item;
    if (product) {
      setTitle(product.title);
      setCat(product.cat);
      setOldCat(product.cat)
      setPrice(product.price);
      setHexColor(product.hexColor);
      setDiscount(product.discount);
      setQua(product.qua);
      setOldQua(product.qua)
      setDesc(product.desc);
      setCapacity(product.capacity);
      setColor(product.color);
      setImages(product.images);
      setImagesUrl(product.images);
    }
  }, [openProForm.item]);

  function cahngeImage(e) {
    e.preventDefault();
    const imgs = [...e.target.files];
    console.log(imgs);
    if (imgs.length > 0) {
      let urls = [];
      for (let i = 0; i < imgs.length; i++) {
        urls.push(URL.createObjectURL(imgs[i]));
      }
      setImages(urls);
      uploadFiles(imgs);
    }
  }

  const uploadFiles = (files) => {
    const promises = [];
    let downloadURLs = [];
    files.forEach((file) => {
      console.log("loop");

      const sotrageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(sotrageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPrg(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            downloadURLs.push(downloadURL);
            console.log("File available at", downloadURLs);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        setImagesUrl(downloadURLs);
      })
      .then((err) => console.log(err));
  };

  function changeColor(e) {
    const colorName = GetColorName(e.target.value.replace("#", ""));
    setColor(colorName);
    setHexColor(e.target.value);
    console.log(e.target.value.replace("#", ""));
  }

  async function submitProduct(e) {
    e.preventDefault();
    if (images.length < 1) {
      setImageErr("please uplaod images");
    } else {
      let keywords=[];
      let k=""
      for(let t of title.split("")){
        k= k+t;
        keywords.push(k)
      }
      console.log(keywords);
      try {
        const data = {
          title:title.toLocaleLowerCase(),
          cat,
          roome,
          price: parseFloat(price),
          discount,
          keywords,
          qua,
          desc,
          capacity,
          color,
          hexColor,
          images: imagesUrl,
          createdAt: new Date(),
        };
        let res;
        if (openProForm.item) {
          res = await setDoc(doc(db, "products", openProForm.item.id), data);
          const oldCatRef = categories.filter(item => item.cat === oldCat )[0]
          const oldCatDoc = doc(db, "categories", oldCatRef.id);
          const count = oldCat === cat ? parseInt(oldCatRef.count) - parseInt(oldQua) + parseInt(qua) : parseInt(oldCatRef.count) - parseInt(oldQua);
          await updateDoc(oldCatDoc, {
              count: count,
          });
          
         
          alert("recipe has been updated");
          closeForm();
        } else {
          res = await addDoc(collection(db, "products"), data);
          closeForm();
        }
        if(!openProForm.item || oldCat !== cat) {
          const newCatRef = categories.filter(item => item.cat === cat )[0]
          alert(parseInt(newCatRef.count)) 
          const newCatDoc = doc(db, "categories", newCatRef.id);
          await updateDoc(newCatDoc, {
              count: parseInt(newCatRef.count) + parseInt(qua) ,
          });
        }
        

        console.log(res);
      } catch (err) {
        console.log(err)
        alert("something wrong please try again");
      }
    }
  }
  return (
    <>
      <div className={`overlay ${openProForm.open ? "show" : ""}`}></div>
      <form
        className={`form card scroll-y ${openProForm.open ? "show" : ""}`}
        onSubmit={submitProduct}
      >
        <div className="space-b form-head">
          <h3>Add New Product</h3>
          <div className="close-btn center" onClick={closeForm}>
            <IoIosClose />
          </div>
        </div>
        <div className="grid-2">
          
          <div className="f-start image-box-cont">
          {images.length > 1 && (
              <div className="temples center">
                {images.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    className={imgInd === index && "active"}
                    alt="uploded... "
                    onClick={() => setImgInd(index)}
                  />
                ))}
              </div>
            )}
            <p
              className="image-box center"
              onClick={() => imageRef.current.click()}
            >
              {images.length > 0 ? (
                <div
                  className="images space-b"
                  style={{
                    transform: `translateX(calc(${-100 * imgInd}% - ${
                      5 * imgInd
                    }px ))`,
                  }}
                >
                  {images.map((img, index) => (
                    <img src={img} key={index} alt="uploded... " />
                  ))}
                </div>
              ) : (
                <>
                  <AiOutlineCloudUpload />
                  <h3>Upload image</h3>
                </>
              )}
              {prg && (
                <div className="uploade-text center">
                  {prg < 100 ? (
                    "Uploding"
                  ) : (
                    <span style={{ color: "green" }}>
                      image Uploded <AiOutlineCheck />
                    </span>
                  )}
                </div>
              )}
              {prg && <progress min="0" max="100" value={prg}></progress>}
              {imageErr && <span>{imageErr}</span>}
              <input
                type="file"
                accept="image/*"
                multiple
                ref={imageRef}
                style={{ display: "none" }}
                onChange={cahngeImage}
              />
            </p>
            
          </div>
          <div className="inputs">
            <p>
              <input
                type="text"
                autoFocus={false}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">title</label>
            </p>
            <p>
              <select
                onChange={(e) => {
                  setRoome(e.target.value);
                }}
              >
                <option value="roome">roome</option>
                <option value="Living room">Living room</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Children's room">Children's room</option>
              </select>
            </p>
            <p>
              <select
                onChange={(e) => {
                  setCat(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value="categorie">categorie</option>
                {categories.map((item) => (
                  <option value={item.cat} key={item.id}  selected={cat === item.cat ? true: false }>
                    {item.cat}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <input
                type="text"
                autoFocus={false}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>price</label>
            </p>

            <p>
              <input
                type="text"
                autoFocus={false}
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <label>discount</label>
            </p>
            <p>
              <input
                type="text"
                autoFocus={false}
                required
                value={qua}
                onChange={(e) => setQua(e.target.value)}
              />
              <label>qua</label>
            </p>
            <p>
              <input
                type="text"
                autoFocus={false}
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <label>Capacity</label>
            </p>

            <p className="f-start" onClick={()=>colorInp.current.click()}>
              
              <input
              ref={colorInp}
              id="color_inp"
                type="color"
                autoFocus={false}
                required
            
                value={hexColor}
                onChange={(e) => {
                  changeColor(e);
                }}
              />
              <input 

                type="text"
                autoFocus={false}
                value={color !== "transparent" ? color : ""}
              />
              <label>Color</label>
            </p>
          </div>
        </div>
        <p>
          <textarea
            rows={5}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <label>description</label>
        </p>
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default AddEditProduct;
