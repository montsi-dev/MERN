import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { Grid, Header, Divider } from "semantic-ui-react";
import NoteForm from "./NoteForm";

export default function AddNote() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = async (data) => {
    const createNote = async (note) => {
      await fetch("http://localhost:5000/notes/add/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": userData.token,
        },
        body: JSON.stringify(note),
      }).then((res) => {
        return res;
      });
    };
    await createNote(data);
    history.push("/");
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Divider hidden />
        <Header as="h2" color="blue" textAlign="center">
          Add a note
        </Header>
        <NoteForm onSubmit={onSubmit}></NoteForm>
      </Grid.Column>
    </Grid>
  );
}
