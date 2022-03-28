import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../Header/AdminHeader";

const CreateTeacher = () => {
  const { register, handleSubmit, reset } = useForm(); // initialize the hook

  const onSubmit = data => {
    axios.post('http://localhost:5000/teacher/signup', data)
      .then(data => {
        if (data.data.insertedId) {
          alert("Teacher Create Successfully");
        } 
        else if(data.data.msg){
          alert(data.data.msg)
        }
         else {
          alert("Something went wrong");
        }
        console.log(data);
      })
      .catch(error => console.log(error));
    reset();
  };

  return (
    <div>
      <AdminHeader />
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <div className="card card-body bg-secondary py-5 px-5">
            <div className="card-header">
              <h1 className="text-white">Create new teacher</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control form-control-custom mb-4 mt-3"
                placeholder="Input Teacher Name"
                {...register("name", { required: true })}
              />
              {/* {errors.name && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Teacher Username"
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
                className="btn btn-success d-block mx-auto px-5 text-white font-weight-bold"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
