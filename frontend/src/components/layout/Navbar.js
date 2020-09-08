import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import { Segment, Header } from "semantic-ui-react";

export default function Navbar() {
  return (
    <Segment clearing padded basic inverted color="blue">
      <Link to="/">
        <Header as="h1" floated="left" inverted>
          MERN notes
        </Header>
      </Link>

      <AuthOptions />
    </Segment>
  );
}
