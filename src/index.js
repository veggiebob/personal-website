// import react libraries
import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './home-page';
import ParseDemoPage from './parse-demo';
import Gym from './gym';
import SProjects from './shadertoy';
import NotFound from './not-found';
import { HashRouter, Route, Router, Routes, Switch } from 'react-router-dom';

const App = props => (
    <HashRouter>
        <div>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/parse-demo" element={<ParseDemoPage />}/>
                <Route path="/gym" element={<Gym />}/>
                <Route path="/shadertoy" element={<SProjects />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </div>
    </HashRouter>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)