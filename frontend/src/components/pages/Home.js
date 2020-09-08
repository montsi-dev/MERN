import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Notes from "../notes/Notes";
import logo from "../../images/list.png";

import {
  Container,
  Grid,
  Divider,
  Header,
  Button,
  Image,
} from "semantic-ui-react";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const addNote = () => history.push("/addnote");

  return (
    <>
      {userData.user ? (
        <Container>
          <Divider hidden />
          <Header textAlign="center" as="h2">
            All notes
          </Header>
          <Button floated="right" color="blue" onClick={addNote}>
            New note
          </Button>
          <Notes />
        </Container>
      ) : (
        <Grid
          textAlign="center"
          style={{ height: "80vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image src={logo} size="tiny" centered />
            <h2>
              Please <a href="./login">Log in</a> or{" "}
              <a href="./signup">Sign up</a> !
            </h2>
          </Grid.Column>
        </Grid>
      )}
    </>
  );
}
