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
    <header className="sticky top-0 z-50 w-full glass-dark py-4 border-b border-white/5 backdrop-blur-xl">
    <div className="container mx-auto px-6">
      <nav className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <span className="text-xl font-bold tracking-tighter text-gradient hidden sm:block">
            BLOG<span className="text-primary/50">APP</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="flex items-center gap-1 hidden md:flex">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/10 ${
                      location.pathname === item.slug 
                        ? 'bg-primary/10 text-primary shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li className="ml-2 pl-2 border-l border-white/10">
              <LogoutBtn icon={true} />
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            className="p-2 bg-transparent hover:bg-white/5 rounded-full" 
            onClick={onOpen}
          >
            <RiMenu2Fill size={24} className="text-white" />
          </Button>
        </div>
      </nav>

      {/* Drawer Component */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay className="backdrop-blur-sm bg-black/40" />
        <DrawerContent className="bg-background/95 border-l border-white/10 text-white">
          <DrawerHeader className="border-b border-white/5 py-6">
            <div className="flex items-center justify-between">
              <Link to={'/'} onClick={onClose}><Logo/></Link>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <RxCross1 size={20} />
              </button>
            </div>
          </DrawerHeader>
          <DrawerBody className="py-8">
            <ul className="space-y-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          onClose();
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                          location.pathname === item.slug 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-primary/5 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="pt-4 mt-4 border-t border-white/5">
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm font-medium text-muted-foreground/60">Account</span>
                    <LogoutBtn icon={false} />
                  </div>
                </li>
              )}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  </header>
  );
};

export default Header;
