import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

async function userRoute(req, res) {
  if (req.session.user) {
    return res.status(200).json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    return res.status(200).json({
      isLoggedIn: false,
      user: {},
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
