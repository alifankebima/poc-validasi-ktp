import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
// import axios from "axios";
// import swal from "sweetalert2";
import pyridamLogo from "../assets/pyridam.png";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import formRegister from "../config/schema/formRegister";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const navigate = useNavigate();

  const [nik, setNIK] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selfieBase64, setSelfieBase64] = useState("");
  const [ktpBase64, setKtpBase64] = useState("");
  const [password, setPassword] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [error, setError] = useState("");
  const [fileNameKTP, setFileNameKTP] = useState("");
  const [fileNameSelfie, setFileNameSelfie] = useState("");

  const handleKTPInput = async (e) => {
    if (
      /^\d*$/.test(e.target.value) &&
      e.target.value.toString().length <= 16
    ) {
      setNIK(e.target.value);
    }
  };

  const handleKTP = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileNameKTP(file.name);

      const reader = new FileReader();

      reader.onload = () => {
        const result = (reader.result as string).split(",")[1]; // Get the Base64 part
        setKtpBase64(result);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelfie = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileNameSelfie(file.name);

      const reader = new FileReader();

      reader.onload = () => {
        const result = (reader.result as string).split(",")[1]; // Get the Base64 part
        setSelfieBase64(result);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  //     if (allowedTypes.includes(file.type)) {
  //       setSelectedFile(file);
  //       setError(""); // Reset error
  //     } else {
  //       setSelectedFile(null);
  //       setError("Only PNG, JPEG, and JPG files are allowed.");
  //     }
  //   }
  // };

  const handleRegister = async (e) => {
    try {
      const payload = {
        trId: uuidv4(),
        name: fullname,
        nik,
        email,
        password,
        dob: moment(dateOfBirth).format("DD-MM-YYYY"),
        ktp: ktpBase64,
        selfie: selfieBase64,
        phone: phoneNumber,
      };

      const { error } = formRegister.validate(payload);
      if (error) {
        Swal.fire({
          title: `Validation Error`,
          text: `${error.message}`,
          icon: `error`,
        });
        throw new Error(error.message);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/validasi-ktp/lowcode/register`,
        payload
      );
      console.log(response)
      if (response?.data?.error == false) {
        Swal.fire({
          title: `Register success`,
          text: `KTP terdaftar pada dukcapil, registrasi akun berhasil!`,
          icon: `success`,
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: `Login failed`,
          text: `${response?.data?.message || "error"} `,
          icon: `error`,
        });
      }
    } catch (error) {
      console.error(error);
      // Swal.fire({
      //   title: `Register failed`,
      //   text: `${error.response.data.message}`,
      //   icon: `error`,
      // });
    }
  };

  return (
    // image background
    <div className="bg-account">
      {/* container to align div center horizontally and vertically */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white rounded account-form shadow-lg m-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister(e);
            }}
          >
            <div className="d-flex flex-column p-3">
              <div className="d-flex justify-content-center mt-2">
                <Link to="/login" className="align-self-center me-auto">
                  <IoIosArrowBack className="fs-2 fw-bold text-primary-theme" />
                </Link>
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme me-auto">
                  <img
                    className=""
                    src={pyridamLogo}
                    style={{ height: 70 }}
                    alt=""
                  />
                </div>
                <IoIosArrowBack
                  className="align-self-center fs-2 fw-bold text-primary-theme"
                  style={{ visibility: "hidden" }}
                />
              </div>
              <div className="mt-4 align-self-center">
                Let's create your account!
              </div>
              <input
                type="email"
                className="border-0 border-bottom border-secondary border-2 mt-4"
                id="formEmailAdress"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="border-0 border-bottom border-secondary border-2 mt-4"
                id="formPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="mt-5 align-self-center">Identity Form</div>
              <input
                type="text"
                className="border-0 border-bottom border-secondary border-2 mt-3"
                id="formFullname"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                className="border-0 border-bottom border-secondary border-2 mt-4"
                id="formNIK"
                placeholder="NIK"
                value={nik}
                onChange={(e) => handleKTPInput(e)}
              />
              <div className="d-flex w-100">
                <input
                  type="text"
                  inputMode="numeric"
                  className="border-0 border-bottom border-secondary border-2 mt-4 me-2 w-50"
                  id="formPhoneNumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  type="date"
                  className="border-0 border-bottom border-secondary border-2 mt-4 ms-2 w-50"
                  id="formDateOfBirth"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="ktpInput" className="form-label">
                  Upload ID Card
                </label>
                <input
                  type="file"
                  className="form-control hidden"
                  id="ktpInput"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleKTP}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="selfieInput" className="form-label">
                  Upload Selfie
                </label>
                <input
                  type="file"
                  className="form-control hidden"
                  id="selfieInput"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleSelfie}
                />
              </div>
              <button
                type="submit"
                className="bg-primary-theme text-center mt-5 py-2 text-white border-0 rounded-pill"
              >
                Register
              </button>
              <div className="mt-4 mb-2 align-self-center">
                Already have an account?{" "}
                <Link to="/login" className="text-secondary-theme">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
