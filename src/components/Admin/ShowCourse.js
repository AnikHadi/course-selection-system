import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";

const ShowCourse = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/admin/Courses")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCourses(data);
        } else {
          setError(`Sorry, Couldn't fetch data from server. try again please.`);
        }
      });
  }, []);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure, You want to delete this course...!")
    if (proceed) {
      fetch(`http://localhost:5000/admin/deleteCourse/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainCourse = courses.filter((course) => course._id !== id);
            setCourses(remainCourse);
            alert("Course has been deleted successfully");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="show-course-section">
      <AdminHeader />
      {!error ? (
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 card card-body bg-white">
            <table className="table">
              <thead className="bg-success">
                <tr className="text-center">
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Class Room</th>
                  <th scope="col">Time</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {courses.map((course) => {

                return (
                  <tbody key={course._id}>
                    <tr className="text-center">
                      <th scope="row"> {course.cId.toUpperCase()} </th>
                      <th scope="row"> {course.courseName.toUpperCase()} </th>
                      <th scope="row"> {course.classRoomNumber.toUpperCase()} </th>
                      <th scope="row"> {course.start} - {course.end} </th>
                      <th scope="row"> {course.assignedTeacher.toUpperCase()} </th>
                      <td>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="btn btn-danger text-white"
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <h1 className="display-4 text-center custom-color-1 bg-dark p-3 mt-5">
          {error}
        </h1>
      )}
    </div>
  );
};

export default ShowCourse;
