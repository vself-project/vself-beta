import React from 'react';
import { useRouter } from 'next/router';

interface ActiveLinkProps {
  children: React.ReactElement;
  href: string;
}
const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default ActiveLink;
