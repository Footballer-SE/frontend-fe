import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Button } from '@mui/material';
const actions = [
  { icon: <SaveIcon />, name: 'Save' ,title:"Takım Ara",button:<Button>asd</Button>},
  { icon: <PrintIcon />, name: 'Print',title:"Oyuncu Ara" },
  { icon: <ShareIcon />, name: 'Share',title:"Rakip Ara" },
];

export default function AdvertButton2() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{  transform: 'translateZ(0px)',     
       position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 1, }}>
      <SpeedDial
        ariaLabel="TopNav Advert Button"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SportsSoccerIcon fontSize='large' />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}