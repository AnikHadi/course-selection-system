import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../App';
import TeacherHeader from '../Header/TeacherHeader';

const AssignedCourse = () => {
    const [courses, setCourses] = useState([])
    const [error, setError] = useState('')
    const [signedInUser] = useContext(ProfileContext)

    useEffect(() => {
        fetch(`http://localhost:5000/teacher/course?name=${signedInUser.name}`)
            .then(res => res.json())
            .then(resData => {
                if (resData.success) {
                    setCourses(resData.data)
                } else {
                    if (courses.length === 0) {
                        setError(`Sorry, you have no assigned course yet. if you think this is mistake please contact with admin.`)
                    } else {
                        setError(`Sorry, Couldn't fetch data from server.`)
                    }
                }
            })
    })

    return (
        <div>
            <TeacherHeader />
            {
                !error ?
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-7 card card-body bg-white'>
                            <table className="table">
                            <thead className="bg-danger">
                                    <tr className='text-center'>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Course Credits</th>
                                    </tr>
                                </thead>
                                {
                                    courses.map(course => {
                                        return (
                                            <tbody key={course._id}>
                                                <tr className='text-center'>
                                                    <th scope="row">{course.cId.toUpperCase()}</th>
                                                    <th scope="row">{course.courseName.toUpperCase()}</th>
                                                    <th scope="row">{course.courseCredits}</th>
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

export default AssignedCourse;