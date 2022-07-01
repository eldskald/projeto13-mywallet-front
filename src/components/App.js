import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from '../shared/UserContext';

import Home from './Home';

function App() {

    const [someValue, setSomeValue] = useState('initialValue');
    const [someOtherValue, setSomeOtherValue] = useState('otherInitialValue');

    return (
        <UserContext.Provider value={{
            someValue, someOtherValue
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
