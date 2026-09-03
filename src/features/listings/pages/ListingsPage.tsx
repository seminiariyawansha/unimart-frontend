import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Skeleton,
    Alert,
    TextField,
    InputAdornment,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import type { RootState } from '../../../app/store';
import { useGetListingsQuery } from '../listingsApi';
import { ListingCard } from '../components/ListingCard';

export default function ListingsPage() {
    const [q, setQ] = useState('');
    const { data, isLoading, isError } = useGetListingsQuery({ q: q || undefined });
    const email = useSelector((state: RootState) => state.auth.email);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE' }}>
            <Box sx={{ bgcolor: '#7A1F2B', py: { xs: 5, sm: 7 }, px: 2 }}>
                <Container maxWidth="md">
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1 }}
                    >
                        Browse listings
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 3 }}>
                        Textbooks, gear, and more from students at your university.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            alignItems: { sm: 'center' },
                        }}
                    >
                        <TextField
                            placeholder="Search listings…"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            fullWidth
                            sx={{
                                maxWidth: 480,
                                bgcolor: '#FFFFFF',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '& fieldset': { border: 'none' },
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#9E9E9E' }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {email && (
                            <Button
                                component={RouterLink}
                                to="/listings/new"
                                startIcon={<AddIcon />}
                                variant="contained"
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    bgcolor: '#FFFFFF',
                                    color: '#7A1F2B',
                                    boxShadow: 'none',
                                    whiteSpace: 'nowrap',
                                    '&:hover': { bgcolor: '#F0EDEE', boxShadow: 'none' },
                                }}
                            >
                                Create listing
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {isLoading && (
                    <Grid container spacing={3}>
                        {[1, 2, 3].map((i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Skeleton
                                    variant="rounded"
                                    height={260}
                                    sx={{ borderRadius: 3, bgcolor: '#E3DDDE' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {isError && (
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                        Couldn't load listings. Check your connection and try again.
                    </Alert>
                )}

                {data && data.content.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ color: '#6E6E6E', mb: 1 }}>
                            No listings match your search
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                            Try a different term, or check back later.
                        </Typography>
                    </Box>
                )}

                {data && data.content.length > 0 && (
                    <Grid container spacing={3}>
                        {data.content.map((listing) => (
                            <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <ListingCard listing={listing} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}