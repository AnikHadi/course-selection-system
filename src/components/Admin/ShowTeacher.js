import React, { useEffect, useState } from 'react';
import AdminHeader from '../Header/AdminHeader';

const ShowTeacher = () => {
    const [teachers, setTeachers] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/admin/teachers')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setTeachers(data)
                } else {
                    setError(`Sorry, Couldn't fetch data from server. try again please.`)
                }
            })
    }, [])

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure, You want to delete this Teacher...!")
        if (proceed) {
            fetch(`http://localhost:5000/admin/deleteTeacher/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainTeacher = teachers.filter(teacher => teacher._id !== id);
                        setTeachers(remainTeacher);
                        alert("Teacher has been deleted successfully")
                    } else {
                        alert('Something went wrong')
                    }
                })
        }
    }

    return (
        <div className='show-teacher-section'>
            <AdminHeader />
            {
                !error ?
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-6 card card-body bg-white'>
                            <table className="table">
                                <thead className="bg-success">
                                    <tr className='text-center'>
                                        <th scope="col">Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    teachers.map(teacher => {
                                        return (
                                            <tbody key={teacher._id}>
                                                <tr className='text-center'>
                                                    <th scope="row">{teacher.name.toUpperCase()}</th>
                                                    <td>{teacher.username}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleDelete(teacher._id)}
                                                            className='btn btn-danger text-white'>
                                                            delete
                                                        </button>
                                                    </td>
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

export default ShowTeacher;