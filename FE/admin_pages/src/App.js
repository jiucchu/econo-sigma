import { Routes, Route, Router } from 'react-router-dom';
import styled from "styled-components"
import BookTable from './components/common/tables/bookTable.jsx';
import BookApproveTable from './components/common/tables/bookApproveTable.jsx';
import './App.css';

import { React, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Header from './components/common/header/header.jsx';
import Loading from './components/common/Loading.jsx'
import UserTable from './components/common/tables/userTable.jsx';
import Category from './components/common/Category.jsx';
import BookList from './pages/BookList.jsx';
import UserList from './pages/UserList.jsx';
import BookApporovePage from './pages/BookApporovePage.jsx';

function App() {
  const currentLocation = useLocation();
  


  return (

    <div className="App">
      {currentLocation.pathname !== '/users/login' && <Header />}
      {currentLocation.pathname.startsWith('/') && <Category />}

      <Routes>
        <Route path="/admin/books" element={<BookList/>}/>
        <Route path="/admin/books/approve" element={<BookApporovePage/>}/>
        <Route path="/admin/users" element={<UserList/>}/>
      </Routes>






    </div>


  );
}



export default App;
