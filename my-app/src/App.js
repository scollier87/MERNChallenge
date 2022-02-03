import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
// import Navbar from "./components/navbar";
// import RecordList from "./components/recordList";
import UpdateUser from "./components/UpdateUser";
import AddUser from "./components/AddUser";

const App = () => {
 return (
   <div>
     {/* <Navbar /> */}
     <Routes>
       <Route path="/update/:id" element={<UpdateUser />} />
       <Route path="/record/add" element={<AddUser />}></Route>
     </Routes>
   </div>
 );
};

export default App;