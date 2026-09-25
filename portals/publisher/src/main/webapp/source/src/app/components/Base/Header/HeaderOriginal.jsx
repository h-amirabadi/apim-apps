import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useIntl } from 'react-intl';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Avatar from 'AppComponents/Base/Header/avatar/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import Configurations from 'Config';
import HeaderSearch from 'AppComponents/Base/Header/headersearch/HeaderSearch';
import GlobalNavBar from 'AppComponents/Base/Header/navbar/GlobalNavBar';
import { GlobalDrawerProvider } from 'AppComponents/Base/Header/navbar/useNavBar';
import LanguageSelector from 'AppComponents/Base/Header/LanguageSelector';


const PREFIX = 'HeaderOriginal';

const classes = {
    appBar: `${PREFIX}-appBar`,
    menuIcon: `${PREFIX}-menuIcon`,
    drawerToggleIcon: `${PREFIX}-drawerToggleIcon`,
    toolbarStyles: `${PREFIX}-toolbarStyles`,
    logo: `${PREFIX}-logo`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.appBar}`]: {
        background: theme.palette.background.appBar,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    [`& .${classes.menuIcon}`]: {
        color: theme.palette.getContrastText(theme.palette.background.appBar),
    },

    [`& .${classes.drawerToggleIcon}`]: {
        color: theme.palette.getContrastText(theme.palette.background.appBar),
    },

    [`& .${classes.toolbarStyles}`]: {
        minHeight: theme.spacing(8),
        paddingInline: theme.spacing(2),
        gap: theme.spacing(1),
    },
}));

/**
 *
 */
export default function HeaderOriginal(props) {
    const { avatar, menuItems, user } = props;
    const theme = useTheme();
    const { locale } = useIntl();
    const isRtl = locale === 'fa';
    const [open, setOpen] = React.useState(false);
    const [openMiniSearch, setOpenMiniSearch] = React.useState(false);
    const toggleMiniSearch = () => { setOpenMiniSearch(!openMiniSearch); };
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    const Icon = open ? CloseIcon : MenuIcon;
    return (
        <Root>
            <GlobalDrawerProvider value={{ open, setOpen }}>
                <AppBar
                    position='fixed'
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolbarStyles}>
                        <IconButton
                            aria-label='Expand publisher landing page drawer'
                            onClick={handleDrawerToggle}
                            edge={isRtl ? 'end' : 'start'}
                            size='large'>
                            <Icon
                                fontSize='large'
                                className={classes.drawerToggleIcon}
                                titleAccess='Expand page drawer'
                            />
                        </IconButton>
                        <Box display='flex' justifyContent='space-between' flexDirection='row' width={1}>
                            <Box display='flex' alignItems='center' sx={{ pt: '4px', minWidth: 0 }}>
                                <Link to='/' aria-label='Go to home page'>
                                    <img
                                        src={Configurations.app.context + theme.custom.logo}
                                        alt={`${theme.custom.title.prefix} ${theme.custom.title.suffix}`}
                                        style={{ height: theme.custom.logoHeight, width: theme.custom.logoWidth }}
                                    />
                                </Link>
                            </Box>
                            <Box display='flex' alignItems='center' sx={{ minWidth: 0 }}>
                                <Hidden mdDown>
                                    <HeaderSearch />
                                </Hidden>
                                <Hidden mdUp>
                                    <IconButton
                                        onClick={toggleMiniSearch}
                                        color='inherit'
                                        aria-label='Search button'
                                        size='large'>
                                        <SearchIcon className={classes.menuIcon} />
                                    </IconButton>
                                    {openMiniSearch
                                        && (
                                            <HeaderSearch toggleSmSearch={toggleMiniSearch} smSearch={openMiniSearch} />
                                        )}
                                </Hidden>
                                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 0 }}>
                                    {menuItems}
                                    <LanguageSelector />
                                    {avatar || <Avatar user={user} />}
                                </div>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <GlobalNavBar setOpen={setOpen} open={open} />
            </GlobalDrawerProvider>
        </Root>
    );
}
