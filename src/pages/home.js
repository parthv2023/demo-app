import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers } from "../redux/action";
import Data from "./data";
import Navbar from "./navbar";



const Adduser = () => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    status: "active", // Default status
  });
  const [error, setError] = useState("");


  const { fname, lname, status } = data;
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    let { name, value, type, checked } = e.target;
    value = type === "checkbox" ? (checked ? "active" : "inactive") : value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fname || !lname) {
      setError("Please fill in the input fields");
    } else {
      dispatch(addUsers(data));
      history("/");
      setError("");
    }
  };

  const handlebtn = () => [
    window.location.reload(true)
  ]

  return (
    <>
    <Navbar />
    <div>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
          <div>
            <div className="flex gap-6 mb-6 w-96">
              <label htmlFor="first_name" className="block mb-2 font-medium text-gray-900 dark:text-white w-40">
                First-name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                id="filled-basic"
                label="FirstName"
                value={fname}
                name="fname"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6 mb-6 md:grid-cols-1 w-96">
              <label htmlFor="first_name" className="block mb-2 font-medium text-gray-900 dark:text-white w-40">
                Last-name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="shon"
                required
                id="filled-basic"
                label="LastName"
                value={lname}
                name="lname"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6 mb-6 md:grid-cols-1 w-96">
              <label htmlFor="status" className="block mb-2 font-medium text-gray-900 dark:text-white w-40">
                Status
              </label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="active"
                    checked={status === "active"}
                    name="status"
                    onChange={handleInputChange}
                  />
                  Active
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="inactive"
                    checked={status === "inactive"}
                    name="status"
                    onChange={handleInputChange}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </div>

        <Button variant="contained" color="primary" type="submit" sx={{ marginBottom: "40px" }} onClick={handlebtn}>
          Add
        </Button>
      </form>
      <Data />
      {/* <Charpage /> */}
    </div>
    </>
  );
};

export default Adduser;
