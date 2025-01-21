import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // Access the current route

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <header className="bg-zinc-200 py-3 shadow-lg">
    <div className="container mx-auto px-4 ">
      <nav className="flex items-center max-md:justify-between">
        {/* Logo Section */}
        <div className="mr-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="flex ml-auto space-x-4 hidden md:flex">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 duration-200 hover:bg-zinc-500 rounded-full font-semibold ${
                      location.pathname === item.slug ? 'bg-blue-600 text-white' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button colorScheme="" color={'black'} onClick={onOpen}>
            <RiMenu2Fill size={24} />
          </Button>
        </div>
      </nav>

      {/* Drawer Component */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        {/* <DrawerOverlay /> */}
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px"><Link to={'/'}><Logo/></Link></DrawerHeader>
          <DrawerBody className="bg-[#f7f7f7] h-full">
            <ul className="space-y-4 relative">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          onClose();
                        }}
                        className="w-full text-left px-2 py-2 rounded-md hover:bg-zinc-300 font-semibold flex items-center"
                      >
                      {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className='font-bold px-1 py-2 text-red-500'>
                  <LogoutBtn icon={false} />
                </li>
              )}
            </ul>
            <button
              className="mt-4 w-full flex justify-center items-center absolute bottom-6 left-0 right-0 "
              onClick={onClose}
            >
              <RxCross1 size={30} fontSize={700}/>
            </button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  </header>
  );
};

export default Header;
