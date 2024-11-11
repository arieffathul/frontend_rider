//import useState
import { useState } from "react";

//import useNavigate
import { useNavigate } from "react-router-dom";

//import API
import api from "../../api";

export default function RiderCreate() {
    //define state
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [series, setSeries] = useState("");
    const [user, setUser] = useState("");

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    //method store data rider
    const storeRider = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append("image", image);
        formData.append("name", name);
        formData.append("series", series);
        formData.append("user", user);

        //send data with API
        await api
            .post("/api/riders", formData)
            .then(() => {
                //redirect to riders index
                navigate("/riders");
            })
            .catch((error) => {
                //set errors response to state "errors"
                setErrors(error.response.data);
            });
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeRider}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="form-control"
                                    />
                                    {errors.image && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.image[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Rider</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Name Rider"
                                    />
                                    {errors.title && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.title[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Series Asal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setSeries(e.target.value)}
                                        placeholder="Series Rider"
                                    ></input>
                                    {errors.content && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.content[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama User</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setUser(e.target.value)}
                                        placeholder="User Rider"
                                    ></input>
                                    {errors.content && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.content[0]}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-md btn-primary rounded-sm shadow border-0"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

