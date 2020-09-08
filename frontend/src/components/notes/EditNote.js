import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Grid, Header, Divider, Button } from "semantic-ui-react";
import NoteForm from "./NoteForm";

export default function EditNote() {
  const { userData } = useContext(UserContext);
  const [note, setNote] = useState();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    const fetchNote = async (id) => {
      const note = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": userData.token,
        },
      }).then((res) => {
        return res.json();
      });
      setNote(note);
    };
    if (userData.token) {
      fetchNote(match.params.id);
    }
  }, [match.params.id, userData.token]);

  const onSubmit = async (data) => {
    const updateNote = async (note, id) => {
      await fetch(`http://localhost:5000/notes/${id}`, {
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

    await updateNote(data, match.params.id);

    history.push("/");
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${match.params.id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": userData.token,
      },
    }).then((res) => {
      return res.json();
    });

    history.push("/");
  };

  return note ? (
    <Grid textAlign="center" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Divider hidden />
        <Header as="h2" color="blue" textAlign="center">
          Edit
        </Header>
        <NoteForm note={note} onSubmit={onSubmit} />
        <Divider hidden />
        <Button floated="right" color="red" onClick={deleteNote}>
          Delete
        </Button>
      </Grid.Column>
    </Grid>
  ) : (
    <div>Loading...</div>
  );
}
