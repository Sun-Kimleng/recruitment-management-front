import { Box, ClickAwayListener } from "@mui/material";
import { useState } from "react";

export default function HandleClickAwayListener(body, open, setOpen){
  
    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    const handleClickAway = () => {
      setOpen(false);
    };
  
    const styles = {
      position: 'absolute',
      top: 28,
      right: 300,
      left: 100,
      zIndex: 1,
      border: '1px solid',
      p: 1,
      bgcolor: 'background.paper',
    };
  
    return (
      <ClickAwayListener 
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleClickAway}
      >
        <Box sx={{ position: 'relative' }}>
          <button type="button"  onClick={handleClick}>
            Open menu dropdown
          </button>
          {open ? (
            <Box sx={styles}>
              {body}
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    );
  }