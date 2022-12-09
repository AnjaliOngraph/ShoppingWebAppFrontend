import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useState } from "react";
import Navbar from "../mainPages/Navbar";

if (typeof window !== "undefined") {
  injectStyle();
}

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  let errors = {};
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex_email.test(values.email)) {
    errors.email = "Invalid Email";
  }
  return errors;
};

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const sendLink = async (values) => {
    const { email } = values;

    const res = await fetch("/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log(data, "data");
    if (data.status === 201) {
      console.log("successfully send");
      setMessage(true);
    } else if (res.status === 400) {
      console.log("User not registered ");
      toast.error("User not registered ", {
        position: "top-center",
      });
    } else if (res.status === 401) {
      console.log("Email not send ");
      toast.error("Email not send", {
        position: "top-center",
      });
    } else {
      console.log("error");
    }
  };

  const cartItems = JSON.parse(localStorage.getItem("cart"));
  return (
    <>
      <Navbar length={cartItems?.length} />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 my-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
              Enter Email
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={sendLink}
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
                  {message ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      Password reset link send successfully
                    </p>
                  ) : (
                    ""
                  )}
                  <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? "relative block w-full appearance-none rounded-none rounded-t-md border border-red-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm mt-4"
                              : "relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm mt-4"
                          }
                          placeholder="Email address"
                        />
                        {errors.email && touched.email && (
                          <span className="text-red-600 text-xs m-3">
                            {errors.email}
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
