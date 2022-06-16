import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";

import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";

import { useRouter } from "next/router";

export default function Navigation() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <Navbar bg="light" expand="lg p-0">
      <Container fluid className="d-flex justify-content-end">
        {user?.isLoggedIn ? (
          <>
            <Nav.Link href="/">HOME</Nav.Link>

            <Nav.Link
              href="/api/logout"
              onClick={async (e) => {
                e.preventDefault();
                mutateUser(
                  await fetchJson("/api/logout", { method: "POST" }),
                  false
                );
                router.push("/");
              }}
            >
              LOGOUT ({user?.user?.username})
            </Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login">LOGIN</Nav.Link>
        )}
      </Container>
    </Navbar>
  );
}
