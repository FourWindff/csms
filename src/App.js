import './App.css';
import AuthPage from "./page/authpage";
import HomePage from "./page/homepage";

import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthPage/>}/> {/* 默认路由到登录/注册页 */}
                    <Route path="/auth" element={<AuthPage/>}/> {/* 路由到登录/注册页 */}
                    <Route path="/home" element={<HomePage/>}/> {/* 工作页面 */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
