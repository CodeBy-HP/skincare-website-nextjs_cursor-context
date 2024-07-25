import Link from "next/link";

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Socials = ({ containerStyles }) => {
  return (
    <ul className={`${containerStyles}`}>
      <li>
        <Link href="/">
          <FaFacebook />
        </Link>
      </li>
      <li>
        <Link href="/">
          <FaInstagram />
        </Link>
      </li>
      <li>
        <Link href="/">
          <FaYoutube />
        </Link>
      </li>
      <li>
        <Link href="/">
          <FaTwitter />
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
