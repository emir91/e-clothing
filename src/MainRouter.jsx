import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Shop from './components/shop/shop.component';
import Signin from './routes/signin/signin.component';
import SignUpForm from './components/sign-up-form/sign-up-form.component';

const MainRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='test' element={<Shop/>}/>
                <Route path='signin' element={<Signin />}/>
                <Route path='signup' element={<SignUpForm />}/>
            </Route>
        </Routes>
    );
};

export default MainRouter;