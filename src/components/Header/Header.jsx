import { AccountCircle } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import Register from 'components/features/Auth/components/Register/Register';
import { logout } from '../../components/features/Auth/userSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

Header.propTypes = {};

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movie',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];

function Header(props) {
  const headerRef = useRef(null);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const loggedInUser = useSelector(state => state.user);
  const userEmailList = loggedInUser.map(info => info.email);
  const isLoggedIn = userEmailList.length > 0;

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleCloseDialog = (reason) => {
      if (reason && reason === "backdropClick") {
          setOpen(false);
      }
  }

  const handleLogOutClick = () => {
      const action = logout();
      dispatch(action);
      handleCloseMenu();
  }

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">
            <img src="https://i.ibb.co/r5krrdz/logo.png" alt="logo" />
          </Link>
          <ul className="header__nav">
          {headerNav.map((header, index) => (
            <li key={index}>
              <NavLink to={header.path}>{header.display}</NavLink>
            </li>
          ))}
          </ul>
        </div>

        <div className="login">
          {!isLoggedIn && (
            <Link to="/" className="btn btn-rounded" onClick={handleClickOpen}>
                Login
            </Link>
          )}
          {isLoggedIn && (
            <IconButton onClick={handleClick} className="circle-icon-container">
                <AccountCircle color="error" fontSize="large" className="circle-icon"/>
            </IconButton>
          )}

          <Dialog disableEscapeKeyDown open={open} onClose={handleCloseDialog}>
            <DialogContent>
                <Register closeDialog={handleClose} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Menu
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}

            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={handleLogOutClick}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
