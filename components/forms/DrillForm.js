import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import { AiFillDelete } from "react-icons/ai";

export default function DrillForm({ deleteDrill, drill, editDrill }) {
  const [drillForm, setDrillForm] = useState(drill);
  const [edited, setEdited] = useState(false);
  return (
    <div className="mb-4 p-2 border border-2 bg-white position-relative">
      <div className="w-100 d-flex justify-content-end">
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            deleteDrill(drillForm);
          }}
        >
          <AiFillDelete />
        </Button>
      </div>
      <Form key={drill.id}>
        <Form.Group controlId="drill-title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={drillForm.title}
            onChange={(e) => {
              setEdited(true);
              setDrillForm({
                ...drillForm,
                title: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="drill-tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={drillForm.tags}
            onChange={(e) => {
              setEdited(true);
              setDrillForm({
                ...drillForm,
                tags: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="drill-stars">
          <Form.Label>Stars</Form.Label>
          <Form.Control
            type="number"
            name="stars"
            value={drillForm.stars}
            onChange={(e) => {
              setEdited(true);
              setDrillForm({
                ...drillForm,
                stars: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="drill-instructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="instructions"
            value={drillForm.instructions}
            onChange={(e) => {
              setEdited(true);
              setDrillForm({
                ...drillForm,
                instructions: e.target.value,
              });
            }}
          />
        </Form.Group>

        <div className="d-grid gap-2 p-2">
          <Button
            size="sm"
            disabled={!edited}
            variant={edited ? "warning" : "secondary"}
            onClick={(e) => {
              editDrill(drillForm);
              setEdited(false);
            }}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
