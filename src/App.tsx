import React from 'react';
import './App.css';
import ToDoList from "./components/ToDo/ToDoList";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Box from "./components/Box/Box";
import PageNotFound from "./components/404/PageNotFound";
import Food from "./components/Food/food";
import Meal from "./components/Meal/Meal";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<ToDoList/>}/>
              <Route path="/food/:query" element={<Food key={"food2"}/>} />
              <Route path="/food/:foodQuery/drink/:drinkQuery" element={<Meal key={"meal1"}/>} />
              <Route element={<Box width={4} height={3} color={'red'} removeBox={()=>null} />}/>
              <Route path="*" element={<PageNotFound/>}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
