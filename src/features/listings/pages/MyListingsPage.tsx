import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Alert,
    Skeleton,
    Card,
    CardContent,
    Chip,
    Button,
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useGetListingsQuery, useArchiveListingMutation } from '../listingsApi';

const statusColors: Record<string, { bg: string; text: string }> = {
    AVAILABLE: { bg: '#EAF4EA', text: '#2E7D32' },
    RESERVED: { bg: '#FFF4E5', text: '#B8710A' },
    SOLD: { bg: '#F0EDEE', text: '#6E6E6E' },
    ARCHIVED: { bg: '#F0EDEE', text: '#9E9E9E' },
};

export default function MyListingsPage() {
    const { data, isLoading } = useGetListingsQuery({});
    const [archiveListing, { isLoading: isArchiving }] = useArchiveListingMutation();

    const handleArchive = async (id: number) => {
        if (window.confirm('Archive this listing? It will no longer be visible to buyers.')) {
            await archiveListing(id);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE' }}>
            <Box sx={{ bgcolor: '#7A1F2B', py: { xs: 5, sm: 7 }, px: 2 }}>
                <Container maxWidth="md">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { sm: 'center' },
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1 }}>
                                My listings
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.85)' }}>
                                Manage what you've posted for sale.
                            </Typography>
                        </Box>
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
                                alignSelf: { xs: 'flex-start', sm: 'center' },
                                '&:hover': { bgcolor: '#F0EDEE', boxShadow: 'none' },
                            }}
                        >
                            Create listing
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>


                {isLoading && (
                    <Grid container spacing={3}>
                        {[1, 2, 3].map((i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3, bgcolor: '#E3DDDE' }} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {data && data.content.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" sx={{ color: '#6E6E6E', mb: 1 }}>
                            You haven't posted any listings yet
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                            Click "Create listing" above to post your first item.
                        </Typography>
                    </Box>
                )}

                {data && data.content.length > 0 && (
                    <Grid container spacing={3}>
                        {data.content.map((listing) => {
                            const statusStyle = statusColors[listing.status] ?? statusColors.ARCHIVED;
                            return (
                                <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Card
                                        elevation={0}
                                        sx={{ borderRadius: 3, border: '1px solid #E3DDDE', bgcolor: '#FFFFFF', height: '100%' }}
                                    >
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%', p: 3 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2B2B2B' }}>
                                                    {listing.title}
                                                </Typography>
                                                <Chip
                                                    size="small"
                                                    label={listing.status}
                                                    sx={{ bgcolor: statusStyle.bg, color: statusStyle.text, fontWeight: 600, fontSize: '0.7rem' }}
                                                />
                                            </Box>
                                            <Typography sx={{ color: '#7A1F2B', fontWeight: 700 }}>
                                                LKR {listing.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                                            </Typography>
                                            <Box sx={{ mt: 'auto', display: 'flex', gap: 1, pt: 1 }}>
                                                <Button
                                                    component={RouterLink}
                                                    to={`/listings/${listing.id}/edit`}
                                                    startIcon={<EditIcon />}
                                                    fullWidth
                                                    sx={{
                                                        borderRadius: 2,
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        border: '1px solid #E3DDDE',
                                                        color: '#2B2B2B',
                                                        '&:hover': { bgcolor: '#F0EDEE', border: '1px solid #E3DDDE' },
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <IconButton
                                                    onClick={() => handleArchive(listing.id)}
                                                    disabled={isArchiving || listing.status === 'ARCHIVED'}
                                                    sx={{
                                                        border: '1px solid #E3DDDE',
                                                        borderRadius: 2,
                                                        color: '#7A1F2B',
                                                        '&:hover': { bgcolor: '#F9EEF0' },
                                                    }}
                                                >
                                                    <ArchiveIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}