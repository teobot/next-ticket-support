import User from "../models/User";
import dbConnect from "./dbConnect";

export async function checkLoggedIn(req, res) {
  const user = req.session.user;

  if (!user?.isLoggedIn || !user) {
    req.session.destroy();
    res.writeHead(302, { Location: "/login" });
    res.end();
    return;
  } else {
    // check that the user account is still active
    await dbConnect();

    try {
      const dbUser = await User.findById(user.user._id);
      if (!dbUser) {
        // user account has been deleted
        req.session.destroy();
        res.writeHead(302, { Location: "/login" });
        res.end();
        return;
      } else {
        return user;
      }
    } catch (error) {
      req.session.destroy();
      res.writeHead(302, { Location: "/login" });
      res.end();
      return null;
    }
  }
}
