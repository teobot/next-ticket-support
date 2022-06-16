import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import { checkLoggedIn } from "../lib/checkUser";

export default function Index() {
  return <div>Index</div>;
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const loggedUser = await checkLoggedIn(req, res);

  // await dbConnect();

  return {
    props: { userData: loggedUser },
  };
},
sessionOptions);
