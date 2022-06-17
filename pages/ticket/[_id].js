import React from "react";

import { Container } from "react-bootstrap";

import dbConnect from "../../lib/dbConnect";

import TicketForm from "../../lib/forms/TicketForm";

import Ticket from "../../models/Ticket";

export default function Edit({ ticket }) {
  return (
    <>
      <TicketForm
        newTicket={false}
        initTicket={{
          title: ticket.title,
          tags: ticket.tags,
          branch: ticket.branch,
          whoToContact: ticket.whoToContact,
          description: ticket.description,
        }}
        formId="edit-ticket-form"
      />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();

    const ticket = await Ticket.findOne({ _id: params._id });

    if (!ticket) {
      return {
        props: {
          category: null,
          error: "ticket not found",
        },
      };
    }

    return {
      props: {
        ticket: JSON.parse(JSON.stringify(ticket)),
        error: null,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: {
        ticket: null,
        error: error,
      },
    };
  }
}
