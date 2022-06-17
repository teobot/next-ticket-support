import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../components/Navbar";

import Head from "next/head";

import { AiOutlineHome } from "react-icons/ai";
import { IoTicketOutline } from "react-icons/io5";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ticket Support</title>
      </Head>

      <div className="h-100 d-flex">
        <div className="p-3">
          <div>
            <div className="p-1 mb-5">
              <AiOutlineHome size={48}/>
            </div>
            <div className="p-1 mb-5">
              <IoTicketOutline size={48} />
            </div>
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
