import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Menu from './Menu';

const Header: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingBottom: 2, zIndex:1500 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 2 }}>
            Example site
          </Typography>
          <Box sx={{flexGrow: 0}}>
            <Menu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

// const Header: React.FC = () => {
//   const theme = useTheme();
//   return (
//     <Box
//     sx={{
//       width: '100%',
//       paddingBottom: theme.spacing(1),
//       marginBottom: theme.spacing(1),
//       paddingLeft: theme.spacing(0),
//       paddingRight: theme.spacing(0),
//     }}
//   >
//       <AppBar position={"static"} >
//         <Toolbar sx={(theme) => pageSpacing(theme)}>
//           <Box sx={{ flex:1, flexGrow: 1, 
//             flexDirection: 'row', 
//             justifyContent: "space-between" }}
//           >
//             <Typography>Example site</Typography>
//             <Menu />
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

export default Header;
