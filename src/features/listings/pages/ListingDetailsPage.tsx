import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Box,
    Container,
    Typography,
    Chip,
    Button,
    Alert,
    CircularProgress,
    Divider,
    Paper,
    Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { RootState } from '../../../app/store';
import { useGetListingQuery } from '../listingsApi';
import { useGetListingReviewsQuery } from '../../reviews/reviewsApi';

const statusColors: Record<string, { bg: string; text: string }> = {
    AVAILABLE: { bg: '#EAF4EA', text: '#2E7D32' },
    RESERVED: { bg: '#FFF4E5', text: '#B8710A' },
    SOLD: { bg: '#F0EDEE', text: '#6E6E6E' },
    ARCHIVED: { bg: '#F0EDEE', text: '#9E9E9E' },
};

export default function ListingDetailsPage() {
    const { id } = useParams();
    const listingId = Number(id);
    const { data: listing, isLoading, isError } = useGetListingQuery(listingId);
    const { data: reviews } = useGetListingReviewsQuery(
        { listingId },
        { skip: !listing },
    );
    const email = useSelector((state: RootState) => state.auth.email);

    if (isLoading) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ color: '#7A1F2B' }} />
            </Box>
        );
    }

    if (isError || !listing) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE', display: 'flex', alignItems: 'center' }}>
                <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" sx={{ color: '#2B2B2B', fontWeight: 700, mb: 1 }}>
                        Listing not found
                    </Typography>
                    <Typography sx={{ color: '#6E6E6E', mb: 4 }}>
                        This listing may have been removed or the link is incorrect.
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
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
                        Back to listings
                    </Button>
                </Container>
            </Box>
        );
    }

    const statusStyle = statusColors[listing.status] ?? statusColors.ARCHIVED;
    const avgRating =
        reviews && reviews.content.length > 0
            ? reviews.content.reduce((sum, r) => sum + r.rating, 0) / reviews.content.length
            : null;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE' }}>
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Button
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        mb: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                        color: '#6E6E6E',
                        '&:hover': { bgcolor: 'transparent', color: '#7A1F2B' },
                    }}
                >
                    Back to listings
                </Button>

                <Paper
                    elevation={0}
                    sx={{ borderRadius: 3, border: '1px solid #E3DDDE', bgcolor: '#FFFFFF', p: { xs: 3, sm: 5 }, mb: 4 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#2B2B2B' }}>
                            {listing.title}
                        </Typography>
                        <Chip
                            label={listing.status}
                            sx={{ bgcolor: statusStyle.bg, color: statusStyle.text, fontWeight: 600 }}
                        />
                    </Box>

                    <Typography sx={{ color: '#9E9E9E', fontWeight: 500, mb: 3 }}>
                        {listing.categoryName} · Sold by {listing.sellerName}
                    </Typography>

                    <Typography sx={{ color: '#4A4A4A', lineHeight: 1.7, mb: 4 }}>
                        {listing.description}
                    </Typography>

                    <Typography variant="h4" sx={{ color: '#7A1F2B', fontWeight: 700, mb: 3 }}>
                        LKR {listing.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                    </Typography>

                    {email && (
                        <Button
                            component={Link}
                            to={`/listings/${listing.id}/edit`}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                borderColor: '#7A1F2B',
                                color: '#7A1F2B',
                                '&:hover': { borderColor: '#5E1721', bgcolor: '#F9EEF0' },
                            }}
                        >
                            Edit listing
                        </Button>
                    )}
                </Paper>

                <Paper
                    elevation={0}
                    sx={{ borderRadius: 3, border: '1px solid #E3DDDE', bgcolor: '#FFFFFF', p: { xs: 3, sm: 5 } }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2B2B2B' }}>
                            Reviews
                        </Typography>
                        {avgRating !== null && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Rating value={avgRating} precision={0.1} readOnly size="small" />
                                <Typography variant="body2" sx={{ color: '#6E6E6E' }}>
                                    {avgRating.toFixed(1)} ({reviews!.content.length})
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {!reviews || reviews.content.length === 0 ? (
                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                            No reviews yet for this seller.
                        </Alert>
                    ) : (
                        reviews.content.map((review, i) => (
                            <Box key={review.id}>
                                <Box sx={{ py: 2 }}>
                                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 0.5 }} />
                                    {review.comment && (
                                        <Typography sx={{ color: '#4A4A4A' }}>{review.comment}</Typography>
                                    )}
                                </Box>
                                {i < reviews.content.length - 1 && <Divider sx={{ borderColor: '#E3DDDE' }} />}
                            </Box>
                        ))
                    )}
                </Paper>
            </Container>
        </Box>
    );
}