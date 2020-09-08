import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Button } from "semantic-ui-react";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const signup = () => history.push("/signup");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <>
      {userData.user ? (
        <Button inverted floated="right" onClick={logout}>
          Log out
        </Button>
      ) : (
        <>
          <Button.Group floated="right">
            <Button inverted onClick={login}>
              Log in
            </Button>
            <Button inverted onClick={signup}>
              Sign up
            </Button>
          </Button.Group>
        </>
      )}
    </>
  );
}
