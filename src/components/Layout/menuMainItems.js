import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse } from '@fortawesome/free-solid-svg-icons'


export const menuMainListItems = (
    <React.Fragment>
        <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Panel startowy" />
            </ListItemButton>
        </Link>

        <Link to="/users" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText style={{ textDecoration: 'unset' }} primary="Użytkownicy" />
            </ListItemButton>
        </Link>

        <Link to="/horses" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItemButton>
                <ListItemIcon>
                    <FontAwesomeIcon icon={faHorse} />
                </ListItemIcon>
                <ListItemText style={{ textDecoration: 'unset' }} primary="Konie" />
            </ListItemButton>
        </Link>

        {/* <Link to="/orders" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItemButton >
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Zamówienia" />
            </ListItemButton>
        </Link> */}

        <Link to="/reports" style={{ textDecoration: 'none', color: 'unset' }}>
            <ListItemButton>
                <ListItemIcon>
                    <CampaignIcon />
                </ListItemIcon>
                <ListItemText primary="Zgłoszenia" />
            </ListItemButton>
        </Link>

        {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        {/* <ListSubheader component="div" inset>
            Użytkownik
        </ListSubheader>
        <ListItemButton href="/settings">
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Ustawienia" />
        </ListItemButton> */}
    </React.Fragment>
);