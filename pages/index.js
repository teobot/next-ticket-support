import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { checkLoggedIn } from "../lib/checkUser";

import dbConnect from "../lib/dbConnect";

import Ticket from "../models/Ticket";
import User from "../models/User";

import { Container, Row, Col, Form, Nav, Button } from "react-bootstrap";

export default function Index({ tickets }) {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col
          md={5}
          className="d-flex d-flex align-items-center justify-content-center"
        >
          <div className="w-75">
            <h2>Search for a ticket</h2>
            <p className="lead">
              Type any of the ticket details to start searching.
            </p>
            <Form.Control type="text" placeholder="Search..." />
          </div>
        </Col>
        <Col className="d-flex flex-column p-3">
          <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">Open</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Deleted</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="h-100 w-100 bg-white border-top-0 border-1 border">
            <div className="p-4 d-flex justify-content-between">
              <Button href="/ticket/create" >New Ticket</Button>
              <Button variant="outline-secondary">Sort Date</Button>
            </div>
            <div className="p-4 h-100 overflow-auto">
              {tickets.map((ticket) => (
                <div className="p-3 mb-4 border rounded clickable">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4>Ticket #1 - 5203</h4>
                    </div>
                    <div>
                      <small>5 months ago</small>
                    </div>
                  </div>
                  <h3>{ticket.title}</h3>
                  <p className="">{ticket.description.substring(0, 100)}...</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>{ticket.createdBy.username}</div>
                    <div>
                      {ticket.tags.map((tag, index) => (
                        <span>{`${tag}${
                          index < ticket.tags.length - 1 ? ", " : ""
                        }`}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  try {
    const loggedUser = await checkLoggedIn(req, res);

    await dbConnect();

    const tickets = await Ticket.find({
      createdBy: loggedUser.user._id,
    }).populate({
      path: "createdBy",
      model: User,
      select: "username",
    });

    return {
      props: {
        tickets: JSON.parse(JSON.stringify(tickets)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        tickets: [],
      },
    };
  }
},
sessionOptions);
