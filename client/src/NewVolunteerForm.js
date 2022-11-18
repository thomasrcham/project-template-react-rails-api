import React, { useState } from 'react';
import { Form } from 'semantic-ui-react'

function NewVolunteerForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      age: age,
      email: email,
      username: username,
      password: password,
    };
    if (password === passwordConfirmation) {
      fetch("/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      })
        .then((r) => r.json())
        .then((newItem) => console.log(newItem));
    } else {
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
      alert("DARBY Y SEO Y JAFET SEZ: Yo your PASSWORD don't match DAWG");
    }
  }

  return (
    <div>
      <strong className="form-title">Sign Up to be a Volunteer</strong>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid label="Volunteer Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={setName}
          />
          <Form.Input
            fluid label="Age"
            placeholder="Age"
            name="age"
            value={age}
            onChange={setAge}
          />
          <Form.Input
            fluid label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={setEmail}
          />
            <Form.Input
            fluid label="Username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={setUsername}
          />
            <Form.Input
            fluid label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={setPassword}
          />
            <Form.Input
            fluid label="Password Confirmation"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
          />
          
        </Form.Group>
        <Form.Button>Sign Up Now</Form.Button>
      </Form>
    </div>
  )
}

export default NewVolunteerForm;