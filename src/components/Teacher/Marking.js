import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileContext } from '../../App';
import TeacherHeader from '../Header/TeacherHeader';
import StudentMark from './StudentMark';

const Marking = () => {
    const [courses, setCourses] = useState([])
    const [error, setError] = useState('')
    const [signedInUser, setSignedInUser] = useContext(ProfileContext)
    const [selectedCourse, setSelectedCourse] = useState([])
    const [enrollStudents, setEnrollStudents] = useState([])
    const [redirect, setRedirect] = useState([])
    const { register, handleSubmit, errors } = useForm(); // initialize the hook

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
    }, [courses.length, signedInUser.name])

    const onSubmit = (data) => {
        fetch('http://localhost:5000/teacher/grading')
            .then(res => res.json())
            .then(resData => {
                if (resData.success) {
                    setEnrollStudents(resData.data)
                    setRedirect(true)
                } else {
                    if (document.length === 0) {
                        setError(`Sorry, no student taken this course`)
                    } else {
                        setError(`Sorry, Couldn't fetch data from server.`)
                    }
                }
            })
        setSelectedCourse(data)
    }

    return (
        <div>
            <TeacherHeader />
            <div className="marking-area row d-flex justify-content-center">
                <div className="col-md-5 card">
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="courseName">Select which course result you want to publish</label>
                            <div className='d-flex'>
                                <select
                                    className='form-control mr-3 mb-2'
                                    {...register("courseName", { required: true})}
                                >
                                    {
                                        courses.map(course => {
                                            return (
                                                <option key={course._id}>
                                                    {course.courseName}
                                                </option>
                                            )
                                        })

                                    }
                                </select>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className='btn btn-success font-weight-bold text-white mb-2'
                                />
                            </div>
                        </form>
                        {
                            redirect && <StudentMark enrollStudents={enrollStudents} selectedCourse={selectedCourse} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marking;