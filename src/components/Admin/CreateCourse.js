import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import AdminHeader from "../Header/AdminHeader";

const CreateCourse = () => {
  const { register, handleSubmit, reset } = useForm(); // initialize the hook

  const onSubmit = data => {
    axios.post('http://localhost:5000/admin/createCourse', data)
    .then(data => {
      if (data.data.insertedId) {
        alert("New course added in database");
      } else {
        alert("Something went wrong");
      }
    })
    .catch(error => console.log(error));
      reset();
  };

  return (
    <div className="pb-5 common-bg">
      <AdminHeader />
      <div className="row d-flex justify-content-center">
        <div className="col-md-4">
          <div className="card card-body bg-secondary pb-5 px-5">
            <div className="card-header">
              <h1 className="text-white">Create new course</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="form-control form-control-custom mb-4 mt-2"
                placeholder="Input Course Name"
                {...register("courseName", { required: true })}
              />
              {/* {errors.courseName && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Course ID"
                {...register("cId", { required: true })}
              />
              {/* {errors.cId && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Department Name"
                {...register("department", { required: true })}
              />
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Class Room Number"
                {...register("classRoomNumber", { required: true })}
              />
              {/* {errors.classRoomNumber && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Course Teacher"
                {...register("assignedTeacher", { required: true })}
              />
              {/* {errors.assignedTeacher && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}
              <input
                className="form-control form-control-custom mb-4"
                placeholder="Input Course Credits"
                {...register("courseCredits", { required: true })}
              />
              {/* {errors.courseCredits && (
                <p className="custom-color-1">'* Field Required'</p>
              )} */}

              <div className="row d-flex justify-content-between">
                <div className="col-md-4 ps-0">
                  <input
                    className="form-control form-control-custom mb-4"
                    placeholder="Input day"
                    {...register("day", { required: true })}
                  />
                  {/* {errors.day && (
                    <p className="custom-color-1">'* Field Required'</p>
                  )} */}
                </div>
                <div className="col-md-4">
                  <input
                    className="form-control form-control-custom mb-4"
                    placeholder="Start time"
                    {...register("start", { required: true })}
                  />
                  {/* {errors.start && (
                    <p className="custom-color-1">'* Field Required'</p>
                  )} */}
                </div>
                <div className="col-md-4 pr-0">
                  <input
                    type="end"
                    className="form-control form-control-custom mb-4"
                    placeholder="End time"
                    {...register("end", { required: true })}
                  />
                  {/* {errors.end && (
                    <p className="custom-color-1">'* Field Required'</p>
                  )} */}
                </div>
              </div>

              <input
                type="submit"
                className="btn btn-success text-white font-weight-bold d-block mx-auto px-5"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
