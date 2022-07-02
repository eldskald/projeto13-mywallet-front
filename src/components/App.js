import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from '../shared/UserContext';
import Dashboard from './Dashboard';

import Home from './Home';
import SignUp from './SignUp';
import NewEntrance from './NewEntrance';
import NewExit from './NewExit';

function App() {

    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value={{
            token, setToken, username, setUsername
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cadastro' element={<SignUp />} />
                    <Route path='/painel' element={<Dashboard />} />
                    <Route path='/nova-entrada' element={<NewEntrance />} />
                    <Route path='/nova-saida' element={<NewExit />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
