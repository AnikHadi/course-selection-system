import React from "react";
import StudentList from "./StudentList";

const StudentMark = ({ enrollStudents, selectedCourse }) => {

    const course = selectedCourse.courseName;

    return (
        <div className="card mt-5">
            {enrollStudents.map((enrollStudent) => {
                return (
                    <div className="card-body">
                        {<StudentList enrollStudent={enrollStudent} course={course} />}
                    </div>
                );
            })}
        </div>
    );
};

export default StudentMark;
