import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status } = useSelector((s) => s.auth);

  if (token) return <Navigate to="/dashboard" />;

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <div className="card">
        <h2>Login</h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginUser(values))
              .unwrap()
              .then(() => {
                toast.success("Logged in successfully");
                navigate("/dashboard");
              })
              .catch((err) => {
                toast.error(err);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field name="username" placeholder="Username" />
                <ErrorMessage name="username" component="div" style={{ color: "red" }} />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" style={{ color: "red" }} />
              </div>
              <button
                className="button"
                type="submit"
                disabled={isSubmitting || status === "loading"}
                style={{ marginTop: "1rem" }}
              >
                {isSubmitting || status === "loading" ? "Logging in…" : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
