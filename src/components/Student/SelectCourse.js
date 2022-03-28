import React, { useContext, useEffect, useState } from "react";
import StuHeader from "../Header/StuHeader";
import { ProfileContext } from "../../App";

const SelectCourse = () => {
  // show all available course for student state
  const [courses, setCourses] = useState([]);
  // student already selected course
  const [studentSelectCourses, setStudentSelectCourses] = useState([]);
  // error msg state
  const [error, setError] = useState("");
  //  selected course object
  const [storeCourse, setStoreCourse] = useState([]);
  // single subject for check multi course add
  const [singleSubject, setSingleSubject] = useState('')
  // subject name array state
  const [subject, setSubject] = useState('');
  const [signedInUser] = useContext(ProfileContext);

  // show all available course purpose
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

  // student already selected course check purpose
  useEffect(() => {
    fetch(`http://localhost:5000/student/enroll?username=${signedInUser.username}&&subject=${singleSubject}`)
      .then(res => res.json())
      .then(data => {

        if (data) {
          setStudentSelectCourses(data)
        }
        else{
          alert("Something went wrong.......!")
        }
        console.log(data);
      })
  }, [singleSubject])


  const handleAddCourse = course => {
    const currentCourse = course.courseName
    setSingleSubject(currentCourse);

    if (studentSelectCourses.firstAdd) {
      const newCourse = [...storeCourse, course];
      setStoreCourse(newCourse);
      const subjectName = newCourse.map(course => course.courseName);
      setSubject(subjectName);
      console.log(course);
      return;
    }
    else {
      for (const i of studentSelectCourses) {
        if (currentCourse === i) {
          alert("Already selected this course.");
          return;
        }
        else if (!i) {
          const newCourse = [...storeCourse, course];
          setStoreCourse(newCourse);
          const subjectName = newCourse.map(course => course.courseName);
          setSubject(subjectName);
        }
      }
    }


    // const newCourse = [...storeCourse, course];
    // setStoreCourse(newCourse);

    // const subjectName = newCourse.map(course => course.courseName);
    // setSubject(subjectName);
  };
  // console.log(studentSelectCourses.firstAdd);



  const handleConfirm = () => {
    const user = signedInUser.username;
    const data = { username: user, enrollCourse: storeCourse, subject }
    fetch("http://localhost:5000/student/enrollCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("your have successfully enroll to all this courses");
        } else {
          alert("Something went wrong");
        }
      });
    setStoreCourse([]);
  };

  //  added course list handle remove course
  const handleRemove = (id) => {
    const remain = storeCourse.filter((course) => course._id !== id);
    setStoreCourse(remain);
  };

  return (
    <div className="show-course-section">
      <StuHeader />
      {!error ? (
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 card card-body bg-white">
            <table className="table">
              <thead className="bg-success text.white">
                <tr className="text-center">
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {courses.map((course) => {
                return (
                  <tbody key={course._id}>
                    <tr className="text-center">
                      <th scope="row">{course.cId}</th>
                      <th scope="row">{course.courseName}</th>
                      <th scope="row">
                        {course.start} - {course.end}
                      </th>
                      <th scope="row">{course.assignedTeacher}</th>
                      <td>
                        <button
                          onClick={() => handleAddCourse(course)}
                          className="btn btn-warning text-white"
                        >
                          Add Course
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>

            <div className="card col-md-4 offset-md-4">
              <div className="card-header">
                <h3 className="text-dark text-center font-weight-bold">
                  Selected Course: {storeCourse.length}
                </h3>
              </div>
              {storeCourse.map((item) => {
                return (
                  <div key={item._id} className="d-flex align-items-center justify-content-between mb-2 p-2">
                    <p className="font-weight-bold mb-0">{item.courseName}</p>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              {storeCourse.length >= 1 && (
                <div className="card-footer">
                  <button
                    onClick={handleConfirm}
                    className="btn btn-success px-5 py-2 mt-3 font-weight-bold text-white d-block mx-auto"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
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

export default SelectCourse;
