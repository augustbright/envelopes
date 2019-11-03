import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const NavBar = () => {
  return (
    <div>
      <Link href="/">
        <a href="#">
          <FontAwesomeIcon className="ml-2" icon={faHome} size="1x" />
        </a>
      </Link>
    </div>
  );
}

export default NavBar;