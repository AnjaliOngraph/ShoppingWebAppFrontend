import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useState } from "react";
import Navbar from "../mainPages/Navbar";
import { useParams } from "react-router-dom";

if (typeof window !== "undefined") {
  injectStyle();
}

const initialValues = {
  password: "",
  cpassword: "",
};

const validate = (values) => {
  let errors = {};
  const regex_password =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!regex_password.test(values.password)) {
    errors.password =
      "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number";
  }

  if (!values.cpassword) {
    errors.cpassword = "Password is required";
  } else if (!regex_password.test(values.cpassword)) {
    errors.cpassword =
      "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password doesnot match";
  }

  return errors;
};

export default function ResetPassword() {
  const { id, token } = useParams();

  const [message, setMessage] = useState("");

  const sendPassword = async (values) => {
    const { password, cpassword } = values;
    const res = await fetch(`/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, cpassword }),
    });
    const data = await res.json();
    console.log(data, "data");

    if (values.password === values.cpassword) {
      if (data.status === 201) {
        setMessage(true);
      } else {
        toast.error(" Token expired, generate new link!", {
          position: "top-center",
        });
      }
    } else {
      toast.error("password doesnot match");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 my-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
              Reset password
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={sendPassword}
          >
            {(formik) => {
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              } = formik;
              return (
                <div>
                  <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    {message ? (
                      <p style={{ color: "green", fontWeight: "bold" }}>
                        Password has been updated successfully
                      </p>
                    ) : (
                      " "
                    )}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        <label htmlFor="password" className="sr-only">
                          New Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? "relative block w-full appearance-none rounded-none rounded-t-md border border-red-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm mt-4"
                              : "relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm mt-4"
                          }
                          placeholder="Enter new password"
                        />
                        {errors.password && touched.password && (
                          <span className="text-red-600 text-xs m-3">
                            {errors.password}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cpassword " className="sr-only">
                          Confirm new Password
                        </label>
                        <input
                          type="password"
                          name="cpassword"
                          id="cpassword"
                          value={values.cpassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.cpassword && touched.cpassword
                              ? "relative block w-full appearance-none rounded-none rounded-t-md border border-red-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm mt-4"
                              : "relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm mt-4"
                          }
                          placeholder="Confirm new password"
                        ></input>
                        {errors.cpassword && touched.cpassword && (
                          <span className="text-red-600 text-xs m-3">
                            {errors.cpassword}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-lime-600 py-2 px-4 text-sm font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                      >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                        Send mail
                      </button>
                    </div>
                  </form>

                  <ToastContainer />
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
