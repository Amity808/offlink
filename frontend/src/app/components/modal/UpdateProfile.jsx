"use client";
import React, { useState, useEffect } from "react";
import { newProfileUpdate } from "@/app/http/authentication";
import { toast } from "react-toastify";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [otherName, setOtherName] = useState("");

  
  const putUserData = async (e) => {
    e.preventDefault();
    const data = {
      firstname: firstname,
      surname: surname,
      othername: otherName,
      phone: phoneNo,
      bankName: bankName,
      bankAccount: bankAccount,
    };
    try {
      const response = await newProfileUpdate(data);
      const res = await response;
      if(res.data){
        toast.success(res?.data.message);
      }
      console.log(res);
      router.push("/profile")
      setFirstname("");
      setSurname("");
      setPhoneNo("");
      setOtherName("");
      setBankAccount("");
      setBankName("");
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  };

  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div>
        {/* update profile Button that opens the modal */}
        <button
          type="button"
          onClick={() => setToggle(true)}
          className="inline-block ml-4 px-6 py-2.5 bg-[#0087FF] text-white font-medium text-md leading-tight rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Update Profile
        </button>

        {/* Modal */}
        {toggle && (
          <div
            className="fixed z-40 overflow-y-auto top-0 w-full left-0"
            id="modal"
          >
            {/* Form with input fields for the profile, that triggers the function on submit */}
            <form onSubmit={putUserData}>
              <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-black opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  {/* Input fields for the product */}
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <label>First Name</label>
                    <input
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-black  rounded-lg"
                    />
                    <label>Other Name</label>
                    <input
                      onChange={(e) => {
                        setOtherName(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-black rounded-lg"
                    />
                    <label>Surname</label>
                    <input
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-black  rounded-lg"
                    />

                    <label>Bank Name</label>
                    <input
                      onChange={(e) => {
                        setBankName(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-black rounded-lg"
                    />

                    <label>Bank Account Number</label>
                    <input
                      onChange={(e) => {
                        setBankAccount(e.target.value);
                      }}
                      required
                      type="text"
                      className="w-full bg-ehite p-2 mt-2 mb-3 border-2 border-black rounded-lg"
                    />

                    <label>Phone Number </label>
                    <PhoneInput
                      onChange={setPhoneNo}
                      value={phoneNo}
                      required
                      type="tel"
                      className="w-full bg-white p-2 mt-2 mb-3 border-2 border-black  rounded-lg"
                    />
                  </div>
                  {/* Button to close the modal */}
                  <div className="bg-blacl px-4 py-3 text-right">
                    <button
                      type="button"
                      className="py-2 px-4 bg-black text-white rounded hover:bg-black mr-2"
                      onClick={() => setToggle(false)}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                    {/* Button to add update the user profile */}
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
