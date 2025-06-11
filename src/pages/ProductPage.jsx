import React, { useEffect, useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../store/productsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((s) => s.products);

  // --- Form/Edit state ---
  const [editId, setEditId] = useState(null);

  // --- Table features state ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter by search term
  const filtered = useMemo(() => {
    return items.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Sort filtered data
  const sorted = useMemo(() => {
    if (!sortConfig.key) return filtered;
    const sortedArr = [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedArr;
  }, [filtered, sortConfig]);

  // Paginate sorted data
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  // Handlers for sort toggling
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  // Formik validation schema
  const schema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
  });

  return (
    <div className="container">
      {/* Form card */}
      <div className="card">
        <h2>Product Management</h2>
        <button className="button" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <Formik
          enableReinitialize
          initialValues={
            editId
              ? items.find((p) => p.id === editId) || { title: "", price: "" }
              : { title: "", price: "" }
          }
          validationSchema={schema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const action = editId
              ? updateProduct({ id: editId, updates: values })
              : addProduct(values);
            dispatch(action)
              .unwrap()
              .then(() => {
                toast.success(editId ? "Product updated" : "Product added");
                resetForm();
                setEditId(null);
              })
              .catch((err) => toast.error(err))
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form style={{ marginTop: "1rem" }}>
              <Field name="title" placeholder="Title" />
              <ErrorMessage
                name="title"
                component="div"
                style={{ color: "red" }}
              />

              <Field
                name="price"
                placeholder="Price"
                style={{ marginLeft: "1rem" }}
              />
              <ErrorMessage
                name="price"
                component="div"
                style={{ color: "red" }}
              />

              <button
                className="button"
                type="submit"
                disabled={isSubmitting}
                style={{ marginLeft: "1rem" }}
              >
                {editId ? "Update" : "Add"} Product
              </button>
              {editId && (
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    resetForm();
                    setEditId(null);
                  }}
                  style={{ marginLeft: "1rem", background: "gray" }}
                >
                  Cancel
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {/* Search, table, pagination card */}
      <div className="card">
        <input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        {status === "loading" ? (
          <p>Loading products…</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => requestSort("title")}>
                    Title{getSortIndicator("title")}
                  </th>
                  <th onClick={() => requestSort("price")}>
                    Price{getSortIndicator("price")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>
                      <button onClick={() => setEditId(p.id)}>Edit</button>
                      <button
                        onClick={() =>
                          dispatch(deleteProduct(p.id))
                            .unwrap()
                            .then(() => toast.success("Product deleted"))
                            .catch((err) => toast.error(err))
                        }
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className="button"
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    margin: "0 0.25rem",
                    opacity: currentPage === i + 1 ? 1 : 0.6,
                    padding: "0.25rem 0.5rem",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
