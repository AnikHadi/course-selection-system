import React, { useEffect, useState } from 'react';
import AdminHeader from '../Header/AdminHeader';


const ShowStudent = () => {
    const [students, setStudents] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/admin/students')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setStudents(data)
                } else {
                    setError(`Sorry, Couldn't fetch data from server. try again please.`)
                }
            })
    })

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure, you want to delete this student?");
        if (proceed) {
            fetch(`http://localhost:5000/admin/deleteStudent/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainStudent = students.filter(student => student._id !== id);
                        setStudents(remainStudent);
                        alert("Successfully delete this Student.");
                    } else {
                        alert("Not delete this student for server problem.")
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
                                        {/* <th scope="col">ID</th> */}
                                        <th scope="col">Name</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {
                                    students.map(student => {
                                        return (
                                            <tbody key={student._id}>
                                                <tr className='text-center'>
                                                    {/* <th scope="row">{teacher._id}</th> */}
                                                    <th scope="row">{student.name.toUpperCase()}</th>
                                                    <th scope="row">{student.sId}</th>
                                                    <td>{student.username}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleDelete(student._id)}
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

export default ShowStudent;