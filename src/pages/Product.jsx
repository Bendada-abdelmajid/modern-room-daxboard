import React, { useState, useEffect, useContext } from "react";
import { BsSearch, BsTrash } from "react-icons/bs";
import { MdOutlineEdit, MdAdd } from "react-icons/md";
import { db } from "../FirebaseConfig";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { AdminContext } from "../AdminContext";
function Product() {
  const { setOpenProForm } = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let q;
    if (search.length > 0) {
      q = query(
        collection(db, "products"),
        where("keywords", "array-contains", search)
      );
    } else {
      q = collection(db, "products");
    }
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProducts(list);
        console.log(list);
        console.log(search);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [search]);
  return (
    <section className="daxboard scrollY">
      
      
      <div className="card ">
      <div className="card-head space-b">
        <h4>Product</h4>
        <div className="center" style={{gap:"10px"}}>
          <div className="search-box">
            <input
              type="text"
              placeholder="search for products"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <BsSearch />
          </div>
          <div className="add-btn center">
            <MdAdd />
          </div>
        </div>
      </div>
        <table>
          <thead>
            <tr>
              <th>All</th>
              <th colSpan={2}>Product</th>
              <th>Price</th>
              <th>Disqount</th>
              <th>Qua</th>
              <th>categorie</th>
              <th>createdAt</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr
                key={index}
                onClick={() => setOpenProForm({ open: true, item })}
              >
                <td style={{ width: "30px" }}>
                  <input type="checkbox" name="order" class="checkbox-btn" />
                </td>
                <td style={{ width: "70px", padding: "5px 0px 5px 15px" }}>
                  <img
                    className="r-img"
                    src={item?.images[0]}
                    alt={item.title}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.discount}</td>
                <td>{item.qua}</td>
                <td>{item.cat}</td>
                <td>{item.createdAt.toDate().toLocaleDateString()}</td>
                <td>
                  <button
                    style={{ background: "var(--bs-red)" }}
                    className="center"
                  >
                    <BsTrash /> Delete
                  </button>
                  <button className="center">
                    <MdOutlineEdit /> Edite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </section>
    
  );
}

export default Product;
