import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css';
import Login from './pages/Login'
import Header from "./components/Header"
import CreateListing from './pages/CreateListing';
import ViewListing from './pages/ViewListing';
import Edit from '@mui/icons-material/Edit';
import Listing from './pages/Listing';
import Home from './pages/Home';


function App() {
  const [user, setUser] = useState(null)
  const [edit, setEdit] = useState(null);
  const [view, setView] = useState(null);
  return (
    <div >

      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login setUser={setUser} login={true} />} />
          <Route path="/register" element={<Login setUser={setUser} login={false} />} />
          {user && <>
            <Route path="/create" element={<CreateListing user={user} />} />
            {user.admin && <>
              <Route path="/view" element={<ViewListing user={user} setView={setView} setEdit={setEdit} />} />
              <Route path="/edit" element={<CreateListing user={user} edit={edit} />} />
              {view && <Route path="/listing" element={<Listing {...view} />} />}</>}
          </>}

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
