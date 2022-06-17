import React from "react";

import { useState } from "react";

import {
  Form,
  Container,
  Card,
  Button,
  Row,
  Col,
  CloseButton,
} from "react-bootstrap";

import { AiFillDelete } from "react-icons/ai";

import { useRouter } from "next/router";

export default function TicketForm({ formId, initTicket, newTicket = true }) {
  const router = useRouter();

  const [tempTicketData, setTempTicketData] = useState({
    tagUser: "",
  });

  const [ticket, setTicket] = useState({
    title: initTicket.title || "",
    tags: initTicket.tags || [],
    branch: initTicket.branch || "",
    whoToContact: initTicket.whoToContact || "",
    description: initTicket.description || "",
  });

  const removeTag = (tag) => {
    setTicket({
      ...ticket,
      tags: ticket.tags.filter((t) => t !== tag),
    });
  };

  const addTag = () => {
    setTicket({
      ...ticket,
      tags: [...ticket.tags, tempTicketData.tagUser],
    });
    setTempTicketData({ ...tempTicketData, tagUser: "" });
  };

  const handleTextChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    let errors = [];
    if (!ticket.title) errors.push("Title is required");
    return errors;
  };

  const handleSubmit = () => {
    let errors = validateInputs();
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      postData();
    }
  };

  const postData = async () => {
    try {
      const response = await fetch("/api/ticket", {
        method: newTicket ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });
      const data = await response.json();
      console.log(data);

      router.push(`/ticket/${data.ticket._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="mt-5">
      <Form key={formId}>
        <Form.Group className="mb-4" controlId={formId + "_title"}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={ticket.title}
            onChange={handleTextChange}
            name="title"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId={formId + "_tags"}>
          <Form.Label>Tags</Form.Label>
          <div className="pb-2" style={{ minHeight: 45 }}>
            {ticket.tags.map((tag, index) => (
              <Button
                size="sm"
                className="d-flex flex-row align-items-center float-start me-3"
                variant="outline-primary"
                key={`${tag}_${index}`}
                onClick={() => {
                  removeTag(tag);
                }}
              >
                {tag} <AiFillDelete className="ms-2" />
                <span className="visually-hidden">unread messages</span>
              </Button>
            ))}
          </div>
          <Row>
            <Col md={10}>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={tempTicketData.tagUser}
                onChange={(e) =>
                  setTempTicketData({
                    ...tempTicketData,
                    tagUser: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.keyCode === 13) addTag();
                }}
              />
            </Col>
            <Col>
              <Button className="w-100" onClick={addTag}>
                Add Tag
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-4" controlId={formId + "_branch"}>
          <Form.Label>branch</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Branch Number"
            value={ticket.branch}
            onChange={handleTextChange}
            name="branch"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId={formId + "_whoToContact"}>
          <Form.Label>Who to contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contact details"
            value={ticket.whoToContact}
            onChange={handleTextChange}
            name="whoToContact"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId={formId + "_description"}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={ticket.description.split("\n").length + 3}
            placeholder="Enter Description"
            value={ticket.description}
            onChange={handleTextChange}
            name="description"
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>

      {/* <Card>
            <Card.Body>
              <Card.Title>Options</Card.Title>
              <Button className="w-100" variant="success">
                Create Ticket
              </Button>
            </Card.Body>
          </Card> */}
    </Container>
  );
}
