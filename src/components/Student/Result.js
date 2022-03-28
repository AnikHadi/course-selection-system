import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../App';
import StuHeader from '../Header/StuHeader';

const Result = () => {
    const [signedInUser, setSignedInUser] = useContext(ProfileContext)
    const [results, setResults] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/student/results?username=${signedInUser.username}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setResults(data.data)
                } else {
                    
                }
            })
    })

    return (
        <div>
            <StuHeader />
            <div className="row d-flex justify-content-center">
                <div className='col-md-5 card'>
                    <div className='card-body bg-white'>
                        <table className='table'>
                            <thead className="bg-success">
                                <tr>
                                    <th scope="col" className='text-white'>Username</th>
                                    <th scope="col" className='text-white'>Course Name</th>
                                    <th scope="col" className='text-white'>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    results.map(result => {
                                        return (
                                            <tr key={result._id}>
                                                <th scope="row">{result.username}</th>
                                                <th scope="row">{result.course}</th>
                                                <th scope="row">{result.mark}</th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;