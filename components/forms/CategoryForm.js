import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import DrillForm from "./DrillForm";

import { useRouter } from "next/router";

export default function CategoryForm({
  formId,
  categoryForm,
  newCategory = true,
}) {
  const [form, setForm] = useState({
    _id: categoryForm._id || "",
    title: categoryForm.title || "",
    drills: categoryForm.drills || [],
  });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event) => {
    setErrors([]);
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const formValidate = () => {
    let err = [];
    if (!form.title) err.push("Title is required");
    return err;
  };

  const handleSubmit = () => {
    const errs = formValidate();
    if (errs.length === 0) {
      postData(form);
    } else {
      setErrors(errs);
    }
  };

  const postData = async (formData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/category", {
        method: newCategory ? "POST" : "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      } else {
        console.log("Category submitted successfully");
      }

      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const generateRandomUuid = () => {
    let d = new Date().getTime(),
      d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    });
  };

  const newDrill = () => {
    setForm({
      ...form,
      drills: [
        ...form.drills,
        {
          id: generateRandomUuid(),
          title: "",
          tags: [],
          stars: 0,
          instructions: "",
        },
      ],
    });
  };

  const editDrill = (specificDrill) => {
    try {
      setForm({
        ...form,
        drills: form.drills.map((drill) => {
          if (drill.id === specificDrill.id) {
            return specificDrill;
          }
          return drill;
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDrill = (deleteDrill) => {
    try {
      setForm({
        ...form,
        drills: form.drills.filter((drill) => drill.id !== deleteDrill.id),
      });
    } catch (error) {}
  };

  return (
    <>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}
      <Form id={formId}>
        <Form.Group className="mb-2" controlId="blog-title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={isLoading}
          />
        </Form.Group>

        <Form.Group controlId="blog-drills">
          <Form.Label>Drills</Form.Label>
          <div>
            {form.drills.map((drill, i) => (
              <DrillForm
                deleteDrill={deleteDrill}
                editDrill={editDrill}
                key={i}
                drill={drill}
              />
            ))}
          </div>
          <div className="d-grid gap-2">
            <Button variant="success" onClick={newDrill} size="md">
              New Drill
            </Button>
          </div>
        </Form.Group>

        <div
          style={{ height: 3, width: "100%", backgroundColor: "lightgrey" }}
          className="mb-5 mt-5"
        />

        <div className="d-grid gap-2 mb-5">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant={"primary"}
            size="lg"
          >
            {newCategory ? "Submit" : "Update"}
          </Button>
        </div>
        <br />
      </Form>
    </>
  );
}
