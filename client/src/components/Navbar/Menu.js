import React from 'react';

import { List } from '@mui/material';
import {
  AccountBalance, ExitToApp, Info, SportsKabaddi, VpnKey,
} from '@mui/icons-material';
import FaceIcon from '@mui/icons-material/Face';
import Item from './Item.js';

const Menu = ({
  user, logout, toggleDrawer, className, itemClassName,
}) => (
  <>
    {
      user?.result
        ? (
          <List className={className}>
            <Item className={itemClassName} text="Home" to="/" icon={<Info />} onClick={toggleDrawer} />
            <Item className={itemClassName} text="Character" to="/character" icon={<FaceIcon />} onClick={toggleDrawer} />
            <Item className={itemClassName} text="Arena" to="/arena" icon={<SportsKabaddi />} onClick={toggleDrawer} />
            <Item className={itemClassName} text="Ranking" to="/ranking" icon={<AccountBalance />} onClick={toggleDrawer} />
            <Item className={itemClassName} text="Logout" to="/auth" icon={<ExitToApp />} onClick={logout} />
          </List>
        )
        : (
          <List className={className}>
            <Item className={itemClassName} text="Home" to="/" icon={<Info />} onClick={toggleDrawer} />
            <Item className={itemClassName} text="Ranking" to="/ranking" icon={<AccountBalance />} onClick={toggleDrawer} />
            <Item className={itemClassName} text="Sign In" to="/auth" icon={<VpnKey />} onClick={toggleDrawer} />
          </List>
        )
    }
  </>
);

export default Menu;
