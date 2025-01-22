import { Routes, Route } from "react-router-dom";
import Category from "../../pages/Category";
import Login from "../../pages/Login";
// import PageNotFound from "../../pages/PageNotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/:categoryId" element={<Category />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
export default AppRoutes;