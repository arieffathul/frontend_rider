import { Route, Routes } from "react-router-dom";
import Home from "../views/home";
import RiderIndex from "../views/riders";
import RiderCreate from "../views/riders/create";
import RiderEdit from "../views/riders/edit";
import RiderCard from "../views/riders/card";

function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/riders" element={<RiderIndex/>} />
            <Route path="/riders/create" element={<RiderCreate />} />
            <Route path="/riders/edit/:id" element={<RiderEdit />} />
            <Route path="/riders/card" element={<RiderCard />} />
        </Routes>
    )
}

export default RoutesIndex