import axios from "axios";
import { useEffect, useState } from "react";

const Employee = () => {
  // Mount, update, unmount
  // React hooks
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    mobile: "",
  });

  // syntax
  //   useEffect(async () => {

  //   }, [employeeForm.firstName]);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setEmployeeForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    switch (action) {
      case "create":
        if (employeeForm.firstName) {
          debugger;
          const apiPost = `${process.env.REACT_APP_BASE_URL}create_employee`;

          const employeePostData = {
            first_name: employeeForm.firstName,
            last_name: employeeForm.lastName,
            mobile_number: employeeForm.mobile,
            designation: employeeForm.designation,
          };
          const data = await axios.post(apiPost, employeePostData);
          window.alert(data.data);
        } else {
          window.alert("Employee first name should required.");
        }
        break;
      case "update":
        if (employeeForm.firstName) {
          const apiPut = `${process.env.REACT_APP_BASE_URL}update_employee`;

          const employeePutData = {
            first_name: employeeForm.firstName,
            last_name: employeeForm.lastName,
            mobile_number: employeeForm.mobile,
            designation: employeeForm.designation,
          };

          const updatedData = await axios.put(apiPut, employeePutData);
          window.alert(updatedData.data.message);
        }
        break;
      case "read":
        const employeeGetApi = `${process.env.REACT_APP_BASE_URL}get_employee?first_name=${employeeForm.firstName}`;
        const requestEmployeeData = await axios.get(employeeGetApi);

        const employeeData = requestEmployeeData?.data;

        setEmployeeForm({
          firstName: employeeData.first_name,
          lastName: employeeData.last_name,
          designation: employeeData.designation,
          mobile: employeeData.mobile,
        });
        break;
      case "delete":
        const employeeDelete = `${process.env.REACT_APP_BASE_URL}delete_employee?first_name=${employeeForm.firstName}`;
        const response = await axios.delete(employeeDelete);

        const result = response?.data;
        setEmployeeForm({
          firstName: "",
          lastName: "",
          designation: "",
          mobile: "",
        });
        window.alert(result?.message);
        break;
      default:
        break;
    }
  };

  return (
    <form>
      <label for="fname">First Name</label>
      <input
        type="text"
        id="fname"
        name="firstName"
        placeholder="Your first name.."
        value={employeeForm.firstName}
        onChange={handleForm}
      />

      <label for="lname">Last Name</label>
      <input
        type="text"
        id="lname"
        name="lastName"
        placeholder="Your last name.."
        value={employeeForm.lastName}
        onChange={handleForm}
      />

      <label for="mobileNumber">Mobile</label>
      <input
        type="text"
        id="mobileNumber"
        name="mobile"
        placeholder="Your mobile number.."
        value={employeeForm.mobile}
        onChange={handleForm}
      />

      <label for="designation">Designation</label>
      <input
        type="text"
        id="designation"
        name="designation"
        placeholder="Your designation.."
        value={employeeForm.designation}
        onChange={handleForm}
      />

      <button onClick={(e) => handleSubmit(e, "create")}>Create</button>
      <button onClick={(e) => handleSubmit(e, "update")}>Update</button>
      <button onClick={(e) => handleSubmit(e, "read")}>Read</button>
      <button onClick={(e) => handleSubmit(e, "delete")}>Delete</button>
    </form>
  );
};

export default Employee;
