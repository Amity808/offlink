import React from "react";
import Navbar from "../components/Navbar";
import UpdateProfile from "../components/modal/UpdateProfile";
import AuthWrapper from "../http/AuthWraper";
const UpdateProfiles = () => {
  return (
    <>
    <AuthWrapper>

      <Navbar />
      <div className=" flex flex-col gap-3 my-[30px]">
        <>
          <UpdateProfile />
        </>
        {/* {fetchedData ?( */}
        <div className=" max-sm:ml-[20px] flex justify-center flex-col items-center mx-auto border-black border-4 rounded-3xl gap-7 w-[600px]">
          <span className=" flex flex-row gap-3 mt-[20px]">
            <p>FirstName:</p>
            <p>fetchedData.firstname</p>
          </span>
          <span className=" flex flex-row gap-3">
            <p>Surname: </p>
            <p>fetchedData.surname</p>
          </span>
          <span className=" flex flex-row gap-3">
            <p>Phone No: </p>
            <p>fetchedData.phone</p>
          </span>
          <span className=" flex flex-row gap-3">
            <p>Account no: </p>
            <p>fetchedData.bankAccount</p>
          </span>
          <span className=" flex flex-row gap-3 mb-5">
            <p>Bank Name: </p>
            <p>fetchedData.bankName</p>
          </span>
        </div>
      </div>
    </AuthWrapper>
    </>
  );
};

export default UpdateProfiles;
