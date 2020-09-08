import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import EditNote from "./components/notes/EditNote";
import AddNote from "./components/notes/AddNote";
import UserContext from "./context/UserContext";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

//import "./style.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // With empty deps array [], this runs once when the app starts, similar to componentDidMount()
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      // If there's no token - it is set to empty string
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // Check if token is valid from backend
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      // Get user data if token is valid
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* Context creates a state (in its value) that it can share with other components (accessed via useContext hook/function). */}
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/addnote" component={AddNote} />
              <Route path="/editnote/:id" component={EditNote} />
            </Switch>
          </Container>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
