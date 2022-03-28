import React from "react";
import { useForm } from "react-hook-form";

const StudentList = ({ enrollStudent, course }) => {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const onSubmit = (data) => {
        fetch("http://localhost:5000/teacher/grading", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, course }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    alert("mark submitted successfully", "success");
                } else {
                    alert("something went wrong", "error");
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-control mb-2"
                    placeholder="Enter student Username"
                    defaultValue={enrollStudent.user}
                    {...register("username", { required: true})}
                />
                <input
                    className="form-control mb-2"
                    placeholder="Enter obtain mark"
                    {...register("mark", { required: true})}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-success text-white font-weight-bold"
                />
            </form>
        </div>
    );
};

export default StudentList;
