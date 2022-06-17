import React from "react";

import TicketForm from "../../lib/forms/TicketForm";

export default function Create() {
  return (
    <>
      <TicketForm
        initTicket={{
          title: "",
          tags: ["New"],
          branch: "",
          whoToContact: "",
          description: "",
        }}
        formId="new-ticket-form"
      />
    </>
  );
}
