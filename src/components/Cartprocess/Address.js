import Navbar from "../Mainpage/Navbar";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";

const initialValues = {
  name: "",
  email: "",
};

const validate = (values) => {
  let errors = {};
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.name) {
    errors.name = "First name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex_email.test(values.email)) {
    errors.email = "Invalid Email";
  }

  return errors;
};

export default function Address() {
  const location = useLocation();
  const length = location.state.length;

  const findProfile = () => {};

  return (
    <div>
      <Navbar length={location.state.length} />
      <div className="m-6 p-6">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Enter Details to find Address.
                </p>
              </div>
            </div>
            <div className=" md:col-span-2 md:mt-0">
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={findProfile}
              >
                {(formik) => {
                  const {
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    dirty,
                  } = formik;
                  return (
                    <div className="shadow sm:overflow-hidden sm:rounded-md grid grid-cols-3 gap-6 col-span-3 sm:col-span-2">
                      <form onSubmit={handleSubmit} className="m-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-lime-500 my-1 focus:ring-lime-500 sm:text-sm"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.name && touched.name && (
                            <span className="text-red-600 text-xs mt-2">
                              {errors.name}
                            </span>
                          )}
                        </div>

                        <div className="my-6">
                          <label htmlFor="email"
                          className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-lime-500 my-1 focus:ring-lime-500 sm:text-sm"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email && (
                            <span className="text-red-600 text-xs mt-2">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        <div className=" py-3 sm:px-6">
                          <button className=" items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-600 px-4 py-1 font-bold text-x  text-white shadow-sm hover:bg-lime-700 hover:shadow-md hover:shadow-lime-500">
                            Check
                          </button>
                        </div>
                      </form>
                    </div>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Delivery Addresses
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Edit Delivery Address
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="m-6 font-bold text-xl">
                    Add Delivery Address
                  </div>
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Pin code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" py-3 ml-7  sm:px-6">
                    <button className=" items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-700 px-4 py-1 font-bold text-x  text-white shadow-sm hover:bg-lime-800 hover:shadow-md hover:shadow-lime-500">
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
