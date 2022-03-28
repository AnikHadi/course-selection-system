import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../Header/AdminHeader";

const CreateStudent = () => {
  const { register, handleSubmit, reset } = useForm(); // initialize the hook

  const onSubmit = data => {
    axios.post('http://localhost:5000/student/signup', data)
      .then((data) => {
        if (data.data.insertedId) {
          alert("Student Create Successfully");
        } 
        else if(data.data.msg){
          alert(data.data.msg)
        }
        else {
          alert("something goes wrong");
        }
      })
      .catch(error => console.log(error));
    console.log(data);
    reset();
  };
  return (
    <div>
      <AdminHeader />
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <div className="card card-body bg-secondary py-5 px-5">
            <div className="card-header">
              <h1 className='text-white text-center'>Create new student</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control form-control-custom mb-4 mt-3"
                placeholder="Input Student ID"
                {...register("sId", { required: true })}
              />
              {/* {errors.sId && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Student Name"
                {...register("name", { required: true })}
              />
              {/* {errors.name && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Student Username"
                {...register("username", { required: true })}
              />
              {/* {errors.username && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Password"
                {...register("password", { required: true })}
              />
              {/* {errors.password && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                type="submit"
                className="btn btn-success text-white d-block mx-auto px-5 font-weight-bold"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
