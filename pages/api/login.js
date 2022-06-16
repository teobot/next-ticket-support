import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

import User from "../../models/User";
import dbConnect from "../../lib/dbConnect";

export default withIronSessionApiRoute(async (req, res) => {
  console.log("logging in");

  await dbConnect();

  const { username, password } = await req.body;

  try {
    const mongoU = await User.findOne({ username });

    try {
      await mongoU.comparePassword(password);
    } catch (error) {
      throw new Error("Invalid password");
    }

    //remove password from response

    const returnSafeUser = mongoU.toObject();
    delete returnSafeUser.password;

    const user = {
      isLoggedIn: true,
      user: returnSafeUser,
    };

    req.session.user = user;

    await req.session.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
