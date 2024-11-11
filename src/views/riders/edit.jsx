/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

//import useNavigate
import { useNavigate, useParams } from "react-router-dom";

//import API
import api from "../../api";

export default function RiderEdit() {
    //define state
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [series, setSeries] = useState("");
    const [user, setUser] = useState("");

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //method fetchDetailRider
    const fetchDetailRider = async () => {
        //fetch data
        await api.get(`/api/riders/${id}`).then((response) => {
            //assign to state
            setName(response.data.data.name);
            setSeries(response.data.data.series);
            setUser(response.data.data.user);
        });
    };

    //hook useEffect
    useEffect(() => {
        //call method "fetchDetailRider"
        fetchDetailRider();
    }, []);

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    //method update rider
    const updateRider = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append("image", image);
        formData.append("name", name);
        formData.append("series", series);
        formData.append("user", user);
        formData.append("_method", "PUT");

        //send data with API
        await api
            .post(`/api/riders/${id}`, formData)
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
                            <form onSubmit={updateRider}>
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
                                        value={name}
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
                                        value={series}
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
                                        value={user}
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
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

