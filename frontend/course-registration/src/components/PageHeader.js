import React from 'react';
import { AppBar, Toolbar, Link, Box, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function PageHeader({isLoggedIn}) {
    const navigate = useNavigate();

  // Uloskirjautumistoiminto
  const handleLogout = () => {
    // Poistetaan token localStorageista
    localStorage.removeItem('token');
    
    // Ohjataan käyttäjä etusivulle
    navigate('/');
    window.location.reload();
  };
  const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Vasen tyhjä tila */}
          <Box sx={{ flex: 1 }} />

          {/* Keskellä oleva linkki */}
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Tervetuloa / Welcome'}
          </Link>

          {/* Oikean puolen linkit */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            
          <Typography
  variant="h6" 
  sx={{
    mr: 2,
    display: "flex",
    alignItems: "center",
    color: isLoggedIn ? "yellow" : "white", // Highlight admin in yellow
    fontWeight: "bold",
  }}
>
  {isLoggedIn ? (
    <>
      <AdminPanelSettingsIcon sx={{ mr: 1 }} /> Admin
    </>
  ) : (
    "Visitor"
  )}
</Typography>
                
              <Button color="inherit" onClick={() => navigate('/login')}>
                Admin - Kirjaudu sisään
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                  Kirjaudu ulos
                </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Jätetään tilaa, jotta sisältö ei mene AppBarin alle */}
      <Toolbar />
      </ThemeProvider>
    </div>
  );
}

/*const PageHeader = ({ isLoggedIn }) => (
  <header>
    <h1>Welcome</h1>
    <p>{isLoggedIn ? "Admin" : "Visitor"}</p>
  </header>
);*/

export default PageHeader;