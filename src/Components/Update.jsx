import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setAge] = useState(0);
  const [error, seterror] = useState();
  const { id } = useParams();

  const navigate = useNavigate();

  //get single user data
  const getSingleUser = async () => {
    const resp = await fetch(`https://mernbbbackend-gpnr.vercel.app/${id}`);

    const result = await resp.json();

    if (!resp.ok) {
      console.log(result.error);
      seterror(result.error);
    }

    if (resp.ok) {
      seterror("");
      setname(result.name);
      setemail(result.email);
      setAge(result.age);
      console.log(result);
    }
  };

  //Send updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`https://mernbbbackend-gpnr.vercel.app/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      seterror(result.error);
    }

    if (response.ok) {
      seterror("");
      navigate("/allpost");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="create_container">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2>Edit your data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
