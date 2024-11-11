//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from "../../api";

//import Link
import { Link } from "react-router-dom";

export default function RiderIndex() {
    //ini state
    const [riders, setRiders] = useState([]);

    //define method
    const fetchDataRiders = async () => {
        //fetch data from API with Axios
        await api.get("/api/riders").then((response) => {
            //assign response data to state "riders"
            setRiders(response.data.data.data);
        });
    };

    //run hook useEffect
    useEffect(() => {
        //call method "fetchDataRiders"
        fetchDataRiders();
    }, []);

    //method deleteRider
    const deleteRider = async (id) => {
        //delete with api
        await api.delete(`/api/riders/${id}`).then(() => {
            //call method "fetchDataRiders"
            fetchDataRiders();
        });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link
                        to="/riders/create"
                        className="btn btn-md btn-success rounded shadow border-0 mb-3"
                    >
                        ADD NEW RIDER DATA
                    </Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Nama Rider</th>
                                        <th scope="col">Series</th>
                                        <th scope="col">Nama User</th>
                                        <th scope="col" style={{ width: "15%" }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riders.length > 0 ? (
                                        riders.map((rider, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <img
                                                        src={rider.image}
                                                        alt={rider.name}
                                                        width="200"
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td>{rider.name}</td>
                                                <td>{rider.series}</td>
                                                <td>{rider.user}</td>
                                                <td className="text-center">
                                                    <Link
                                                        to={`/riders/edit/${rider.id}`}
                                                        className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                                                    >
                                                        EDIT
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteRider(rider.id)}
                                                        className="btn btn-sm btn-danger rounded-sm shadow border-0"
                                                    >
                                                        DELETE
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                <div className="alert alert-danger mb-0">
                                                    Data Rider Belum Tersedia!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

