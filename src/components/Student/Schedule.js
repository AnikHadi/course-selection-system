import React, { useContext, useEffect, useState } from 'react';
import StuHeader from '../Header/StuHeader';
import { ProfileContext } from '../../App';

const Schedule = () => {
    const [courses, setCourses] = useState([])
    const [error, setError] = useState('')
    const [signedInUser] = useContext(ProfileContext)

    useEffect(() => {
        fetch(`http://localhost:5000/student/enroll?username=${signedInUser.username}`)
            .then(res => res.json())
            .then(data => {
                if (data.enrollCourse) {
                    setCourses(data.enrollCourse)
                } else {
                    if (courses.length === 0) {
                        setError(`Sorry, You haven't selected any course`)
                    } else {
                        setError(`Sorry, Couldn't fetch data from server.`)
                    }
                }
                // console.log(data);
            })
    }, [])

    const handleDeleteCourse = id => {
        const proceed = window.confirm("Are you sure, you want to delete this course........!")
        if (proceed) {
            const url = `http://localhost:5000/student/enroll/${id}`;
            fetch(url, { method: "DELETE"})
            .then(res => res.json())
            // .then(data => {

            // })



            console.log(id);
        }

    }
    console.log(courses);

    return (
        <div className='show-course-section'>
            <StuHeader />
            {
                !error ?
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-7 card card-body bg-white'>
                            <table className="table">
                                <thead className="bg-success">
                                    <tr className='text-center'>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Teacher</th>
                                        <th scope="col">Day</th>
                                        <th scope="col">Time</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                {
                                    courses.map(course => {
                                        return (
                                            <tbody key={course._id}>
                                                <tr className='text-center'>
                                                    <th scope="row">{course.cId}</th>
                                                    <th scope="row">{course.courseName}</th>
                                                    <th scope="row">{course.assignedTeacher}</th>
                                                    <th scope="row">{course.day}</th>
                                                    <th scope="row">{course.start} - {course.end}</th>
                                                    <th scope="row">
                                                        <button
                                                            className='btn btn-warning'
                                                        >Update</button>
                                                    </th>
                                                    <th scope="row">
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => handleDeleteCourse(course._id)}
                                                        >X</button>
                                                    </th>

                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </div>
                    :
                    <h1 className="display-4 text-center custom-color-1 bg-dark p-3 mt-5">{error}</h1>
            }
        </div>
    );
};

export default Schedule;