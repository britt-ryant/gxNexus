import './App.css';
import Home from './components/Home';
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Container
} from "@mui/material";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import MainRouter from './MainRouter';

const drawerWidth = 240;

function App() {
  return(

  //   <Box sx={{ display: 'flex'}}>
  //     <CssBaseline />
  //     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: 40, alignItems: "center" }}>
  //       <Toolbar variant="regular">
  //         <Typography variant="h6" noWrap component="div" sx={{fontSize: 'small', alignItems: "center" }} >
  //           WELCOME
  //         </Typography>
  //       </Toolbar>
  //     </AppBar>
  //     <Drawer
  //       variant="permanent"
  //       sx={{
  //         width: drawerWidth,
  //         flexShrink: 0,
  //         [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
  //       }}>
  //     <Toolbar />
        
  //         <Box sx={{ overflow: 'auto' }}>
  //         <List>
  //           {['Upload', 'Analyze'].map((text, index) => (
  //             <ListItem key={text} disablePadding>
  //               <ListItemButton>
  //                 <ListItemIcon>
  //                   {index % 2 === 0 ? <FileUploadOutlinedIcon /> : <AnalyticsOutlinedIcon />}
  //                 </ListItemIcon>
  //                 <ListItemText primary={text} />
  //               </ListItemButton>
  //             </ListItem>
  //           ))}
  //         </List>
  //         <Divider />
  //       </Box>
  //       </Drawer>
  //     <Toolbar />
      
  //   <Container fixed sx={{alignItems: "center", marginTop: 8}}>
  //       <Box sx={{border: 0.1, borderColor:'black', width: '100%', height: 150, p:3, textAlign: "center"}}>
  //            <Home /> 
  //       </Box>
  //         <h1>Preview</h1>
  //   </Container>
  // </Box>

    <>
      <MainRouter />
    </>
  )
}

export default App;
