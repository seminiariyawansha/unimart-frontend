import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

export function Header() {
    const email = useSelector((state: RootState) => state.auth.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const displayName = email ? email.split('@')[0] : null;

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E3DDDE' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Box
                    component={RouterLink}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        textDecoration: 'none',
                        color: '#2B2B2B',
                    }}
                >
                    <StorefrontIcon sx={{ color: '#7A1F2B' }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2B2B2B' }}>
                        UniMart
                    </Typography>
                </Box>

                {displayName ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/my/listings"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#6E6E6E',
                                '&:hover': { bgcolor: 'transparent', color: '#7A1F2B' },
                            }}
                        >
                            My listings
                        </Button>
                        <Typography sx={{ color: '#6E6E6E', fontWeight: 500 }}>
                            Hi, {displayName}!
                        </Typography>
                        <Button
                            onClick={handleLogout}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#7A1F2B',
                                border: '1px solid #E3DDDE',
                                '&:hover': { bgcolor: '#F0EDEE', border: '1px solid #E3DDDE' },
                            }}
                        >
                            Log out
                        </Button>
                    </Box>
                ) : (
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="contained"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            bgcolor: '#7A1F2B',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#5E1721', boxShadow: 'none' },
                        }}
                    >
                        Log in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}