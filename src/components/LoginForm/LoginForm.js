import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ProfileContext } from "../../App";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [signedInUser, setSignedInUser] = useContext(ProfileContext);
  let navigate = useNavigate();


  const onSubmit = inputData => {
    // Student Login
    if (inputData.role === "student") {
      axios.post('http://localhost:5000/student/signin', inputData)
        .then(data => {
          const user = data.data[0];
          if (user) {
            setSignedInUser({
              id: user._id,
              name: user.name,
              username: user.username,
              role: inputData.role,
            });
            navigate("/dashboard/student");
          }
          console.log(data);
        })
        .catch(err => console.log(err));



      // fetch("http://localhost:5000/student/signin", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json ",
      //   },
      //   body: JSON.stringify({ ...inputData }),
      // })
      //   .then((res) => res.json())
      //   .then((resData) => {
      //     if (resData.success) {
      //       setSignedInUser({
      //         id: resData.data[0]._id,
      //         name: resData.data[0].name,
      //         username: resData.data[0].username,
      //         role: inputData.role,
      //       });
      //       navigate("/dashboard/student");
      //     }
      //     console.log(signedInUser);
      //   });
    }
    // Teacher SignIn
    else if (inputData.role === "teacher") {
      axios.post('http://localhost:5000/teacher/signin', inputData)
        .then(data => {
          const user = data.data[0];
          if (user) {
            setSignedInUser({
              id: user._id,
              name: user.name,
              username: user.username,
              role: inputData.role,
            });
            navigate("/dashboard/teacher");
          }
          console.log(data);
        })
        .catch(err => console.log(err));
    }
    // for Admin Login
    else if (inputData.role === "admin") {
      axios.post('http://localhost:5000/admin/signin', inputData)
        .then(data => {
          const user = data.data[0];
          if (user) {
            alert("Successfully Login to Admin.")
            setSignedInUser({
              id: user._id,
              name: user.name,
              username: user.username,
              role: inputData.role,
            });
            navigate("/dashboard/admin");
          }
          else if(user === 0) {
            alert("Something wrong to fetch the server data.")
          }
          console.log(data);
        })
        .catch(err => console.log(err));
    }

    // for registration
    // else {
    //   axios.post('http://localhost:5000/admin/register', data)
    //     .then(data => {
    //       if (data.data.insertedId) {
    //         alert('SuccessFully registered Admin');
    //        // const addedUser = data;
    //        // const updateUser = [...signedInUser, addedUser];
    //        // setSignedInUser(updateUser);
    //       }
    //       console.log(data);
    //     })
    // }

    // reset input field
    // reset();
  };
  return (
    <div className="login-container row mt-5">
      {signedInUser.username ? <>
        <div className="card col-md-4 offset-md-4 px-0">
          <div className="card-header text-center">Login Info</div>
          <div className="card-body">
            <h3 className="text-dark text-center font-weight-bold">
              {signedInUser.name.toUpperCase()}
            </h3>
          </div>
          <div className="card-footer">
            <Link
              to={`/dashboard/${signedInUser.role}`}
              className="btn btn-success px-5 d-block mx-auto"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </>
        :
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center text-primary">Login</h1>
            </div>
            <div className="card-body">



              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control d-flex justify-content-between align-items-center mb-2">
                  <p className="text-primary mb-0">Select Type</p>
                  <select name="role"
                    {...register('role', { required: true })}
                    className="form-select">
                    <option selected></option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {/* <label
                  htmlFor="id"
                  className="mb-1 font-weight-bold text-primary"
                >
                  Enter Name
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="username"
                  {...register('name', { required: true })}
                /> */}
                <label
                  htmlFor="id"
                  className="mb-1 font-weight-bold text-primary"
                >
                  Enter Username
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="username"
                  {...register('username', { required: true })}
                />
                <label
                  htmlFor="password"
                  className="mb-1 font-weight-bold text-primary"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  className="form-control mb-3"
                  name="password"
                  {...register('password', { required: true })}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success px-5 mx-auto d-block"
                />
              </form>


            </div>
          </div>
        </div>

      }

    </div>
  );
};

export default LoginForm;
