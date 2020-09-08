import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import ErrorNotice from "../misc/ErrorNotice";
import UserContext from "../../context/UserContext";
import { Button, Form, Segment } from "semantic-ui-react";

export default function NoteForm({ note, onSubmit }) {
  const [error, setError] = useState();
  const { userData } = useContext(UserContext);

  const { register, handleSubmit } = useForm({
    defaultValues: note
      ? {
          title: note.title,
          text: note.text,
        }
      : { title: "", text: "" },
  });

  const submitHandler = handleSubmit((data) => {
    data.userId = userData.user.id;
    onSubmit(data);
  });

  return (
    <Form size="large" onSubmit={submitHandler}>
      <Segment stacked>
        <Form.Field>
          <label>Title / Header</label>
          <input name="title" placeholder="Title/Header" ref={register} />
        </Form.Field>
        <Form.Field>
          <label>Text</label>
          <textarea name="text" ref={register}></textarea>
        </Form.Field>
        <Button type="submit" color="blue" fluid size="large">
          Save changes
        </Button>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
      </Segment>
    </Form>
  );
}
