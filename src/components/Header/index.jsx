import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

import styles from './Header.module.scss'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthSelector, logout } from '../../redux/slices/authSlice'

export const Header = () => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log?')) {
      dispatch(logout())
      localStorage.removeItem('token')
    }
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>FulStack MERN BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
