import React, { useState } from "react";

import useUser from "../lib/useUser";
import fetchJson, { FetchError } from "../lib/fetchJson";

import DefaultContainer from "../components/DefaultContainer";
import HeaderSegment from "../components/HeaderSegment";

import { Alert, Button, Form } from "react-bootstrap";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <DefaultContainer>
      <HeaderSegment
        title={<strong>LOGIN</strong>}
        subtitle="Login to access the admin panel"
      />
      <div className="w-50">
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Form
          className="d-flex align-items-center flex-column w-100"
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();

            setIsLoading(true);

            const body = {
              username: event.currentTarget.username.value,
              password: event.currentTarget.password.value,
            };

            try {
              mutateUser(
                await fetchJson("/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                }),
                false
              );
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
              } else {
                console.error("An unexpected error happened:", error);
              }
            }

            setIsLoading(false);
          }}
        >
          <Form.Group className="mb-3 w-100" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              required
              disabled={isLoading}
              type="text"
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              required
              disabled={isLoading}
              type="password"
              size="lg"
            />
          </Form.Group>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-100 mt-2"
            size="lg"
          >
            Submit
          </Button>
        </Form>
      </div>
    </DefaultContainer>
  );
}
