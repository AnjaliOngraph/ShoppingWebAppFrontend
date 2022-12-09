import { Formik } from "formik";
import { ToastContainer } from "react-toastify";

const validate = (values) => {
  let errors = {};
  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexPhoneNumber = /^[1-9]\d{2}\d{3}\d{4}/;
  const regexPinCode = /^[1-9][0-9]{5}$/;

  if (!values.name) {
    errors.name = "First name is required";
  }

  if (!values.mobileNo) {
    errors.mobileNo = "Phone number is required";
  } else if (!regexPhoneNumber.test(values.mobileNo)) {
    errors.mobileNo = "invalid format";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex_email.test(values.email)) {
    errors.email = "Invalid Email";
  }

  if (!values.pinCode) {
    errors.pinCode = "Pincode is required";
  } else if (!regexPinCode.test(values.pinCode)) {
    errors.pinCode = "Invalid format";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.city) {
    errors.city = "City is required";
  }

  return errors;
};

export default function EditAddressForm(props) {
  const editAddressId = localStorage.getItem("editAddressId");

  const filteredAddress = props.addresses.filter((e) => {
    return e._id === editAddressId;
  });

  const initialValues = {
    name: filteredAddress[0].name,
    mobileNo: filteredAddress[0].mobileNo,
    email: filteredAddress[0].email,
    pinCode: filteredAddress[0].pinCode,
    address: filteredAddress[0].address,
    city: filteredAddress[0].city,
  };

  const DeliveryAddress = async (values) => {
    const { name, mobileNo, email, pinCode, address, city } = values;
    try {
      console.log("edithandler called");
      const res = await fetch(`/updateAddress/${editAddressId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("userId"),
        },
        body: JSON.stringify({
          name,
          mobileNo,
          email,
          pinCode,
          address,
          city,
        }),
      });
      const details = await res.json();
      if (res.status === 201) {
        console.log("address updated, successfully");
        for (let i = 0; i < props.addresses.length; i++) {
          if (props.addresses[i]._id === editAddressId) {
            props.addresses[i] = details;
            props.setEditForm(false);
            break;
          } else {
            console.log("id not found");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={DeliveryAddress}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          handleBlur,
          touched,
        } = formik;
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow border-solid border-l-2 border-gray-300">
                <div className="inline-flex">
                  <div className="m-6 font-bold text-xl">
                    Edit Delivery Address
                  </div>
                  <button
                    className="right-16 m-4 absolute hover:font-semibold "
                    onClick={() => {
                      props.setEditForm(false);
                    }}
                    title="close"
                  >
                    X
                  </button>
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
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="given-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.name && touched.name && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="mobileNo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="mobileNo"
                        id="mobileNo"
                        value={values.mobileNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.mobileNo && touched.mobileNo && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.mobileNo}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        autoComplete="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.email && touched.email && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.address && touched.address && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.address}
                        </span>
                      )}
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
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.city && touched.city && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.city}
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        PinCode
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        id="pinCode"
                        value={values.pinCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                      />
                      {errors.pinCode && touched.pinCode && (
                        <span className="text-red-600 text-xs mt-2">
                          {errors.pinCode}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" py-3 sm:px-6">
                  <button
                    className="  items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-700 px-4 py-1 font-bold text-x  text-white shadow-sm hover:bg-lime-800 hover:shadow-md hover:shadow-lime-500"
                    onClick={() => props.setEditForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-2 items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-lime-700 px-4 py-1 font-bold text-x  text-white shadow-sm hover:bg-lime-800 hover:shadow-md hover:shadow-lime-500"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
            <ToastContainer />
          </div>
        );
      }}
    </Formik>
  );
}
