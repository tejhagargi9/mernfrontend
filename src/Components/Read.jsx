import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState();

  //print users

  const getData = async () => {
    const resp = await fetch("https://mernbbbackend-gpnr.vercel.app/");
    const res = await resp.json();

    if (!resp.ok) {
      console.log(result.error);
      seterror(result.error);
    }

    if (resp.ok) {
      setdata(res);
    }
  };

  //delete user

  const handleDelete = async (id) => {
    const resp = await fetch(`https://mernbbbackend-gpnr.vercel.app/${id}`, {
      method: "DELETE",
    });

    const result = await resp.json();

    if (!resp.ok) {
      console.log(result.error);
      seterror(result.error);
    }

    if (resp.ok) {
      seterror("Deleted Successfully");

      setTimeout(() => {
        seterror("");
        getData();
      }, 1000);
    }
  };

  //render once page is loaded
  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      {error && <div class="alert alert-danger">{error}</div>}
      <div className="Whole-Container">
        {data?.map((elem) => (
          <div key={elem._id} className="card-containers">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{elem.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{elem.email}</h6>
                <p className="card-text">{elem.age}</p>
                <a
                  href="#"
                  className="card-link"
                  onClick={() => handleDelete(elem._id)}
                >
                  Delete
                </a>
                <Link to={`/${elem._id}`} className="card-link">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Read;
