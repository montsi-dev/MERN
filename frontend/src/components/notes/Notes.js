import React, { useState, useEffect, useContext } from "react";
import { Container, Item } from "semantic-ui-react";

import Axios from "axios";
import UserContext from "../../context/UserContext";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await Axios.get("http://localhost:5000/notes/", {
        headers: { "x-auth-token": userData.token },
      }).then((res) => {
        return res.data;
      });
      setNotes(notes);
    };
    fetchNotes();
  }, [userData.token]);

  return (
    <Container>
      <Item.Group divided>
        {notes.map((note) => (
          <Item key={note._id}>
            <Item.Content>
              <Item.Header>{note.title}</Item.Header>
              {/* <Item.Meta>
                <span>Date</span>
              </Item.Meta> */}
              <Item.Description>{note.text}</Item.Description>
              <Item.Extra>
                <a href={`./editnote/${note._id}`}>Edit</a>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Container>
  );
}
