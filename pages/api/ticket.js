import dbConnect from "../../lib/dbConnect";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { checkLoggedIn } from "../../lib/checkUser";

import Ticket from "../../models/Ticket";

export default withIronSessionApiRoute(async function userRoute(req, res) {
  const { method } = req;

  await dbConnect();

  const user = await checkLoggedIn(req, res);

  let { title, tags, branch, whoToContact, description } = req.body;

  switch (method) {
    case "POST":
      try {
        const ticket = new Ticket({
          title,
          description,
          tags,
          createdBy: user.user._id,
          branch,
          whoToContact,
          colour: "red",
        });

        await ticket.save();

        return res.send({ message: "category created successfully", ticket });
      } catch (error) {
        return res.status(422).send(error.message);
      }
    case "PATCH":
      try {
        const filter = { _id: req.body._id };
        const update = { title, tags, branch, whoToContact, description };

        let doc = await Ticket.findOneAndUpdate(filter, update);

        return res.send({
          message: "Category updated successfully",
          blog: categoryToUpdate,
        });
      } catch (error) {
        return res.status(422).send(error.message);
      }
  }
}, sessionOptions);
