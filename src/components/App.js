import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from '../shared/UserContext';

import Home from './Home';
import SignUp from './SignUp';

function App() {

    const [token, setToken] = useState('');

    return (
        <UserContext.Provider value={{
            token, setToken
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cadastro' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
