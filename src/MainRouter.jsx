import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop/>}/>
                <Route path='auth' element={<Authentication />}/>
                <Route path='signup' element={<SignUpForm />}/>
            </Route>
        </Routes>
    );
};

export default MainRouter;