import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Paper,
    Container,
    InputAdornment,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useLoginMutation } from '../authApi';
import { setCredentials } from '../authSlice';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({ accessToken: result.accessToken, email }));
            const redirectTo = (location.state as { from?: string })?.from ?? '/';
            navigate(redirectTo, { replace: true });
        } catch {
            setError('Invalid email or password.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#F0EDEE',
                px: 2,
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 3,
                        border: '1px solid #E3DDDE',
                        bgcolor: '#FFFFFF',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                bgcolor: '#7A1F2B',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                            }}
                        >
                            <SchoolIcon sx={{ color: '#FFFFFF', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#2B2B2B' }}>
                            Welcome to UniMart
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6E6E6E', mt: 0.5 }}>
                            Log in with your university email
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
                        <TextField
                            label="University email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            fullWidth
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ color: '#9E9E9E' }}>

                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': { borderColor: '#7A1F2B' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#7A1F2B' },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': { borderColor: '#7A1F2B' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#7A1F2B' },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            fullWidth
                            size="large"
                            sx={{
                                mt: 1,
                                py: 1.3,
                                borderRadius: 2,
                                bgcolor: '#7A1F2B',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#5E1721', boxShadow: 'none' },
                                '&:disabled': { bgcolor: '#C9A9AD' },
                            }}
                        >
                            {isLoading ? 'Logging in…' : 'Log in'}
                        </Button>
                    </Box>
                </Paper>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ color: '#9E9E9E', mt: 3 }}
                >
                    UniMart · University marketplace
                </Typography>
            </Container>
        </Box>
    );
}