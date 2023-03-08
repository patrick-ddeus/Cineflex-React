import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

import Header from "./components/Header";
export default function App () {
    

    return (
        <Router>
            <Header logo={"CINEFLEX"} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:id" element={<SessionsPage />} />
                <Route path="/assentos/:sessionId" element={<SeatsPage />} />
                <Route path="/sucesso" element={<SuccessPage />} />
            </Routes>
        </Router>
    );
}


