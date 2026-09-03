import { useNavigate, useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Alert, CircularProgress, Paper, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useCreateListingMutation,
    useUpdateListingMutation,
    useGetListingQuery,
} from '../listingsApi';
import { ListingForm } from '../components/ListingForm';
import type { ListingInput } from '../listingTypes';

export default function ListingFormPage() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const listingId = id ? Number(id) : undefined;
    const navigate = useNavigate();

    const { data: existing, isLoading: isLoadingExisting } = useGetListingQuery(
        listingId!,
        { skip: !isEdit },
    );
    const [createListing, { error: createError }] = useCreateListingMutation();
    const [updateListing, { error: updateError }] = useUpdateListingMutation();

    const handleSubmit = async (values: ListingInput) => {
        if (isEdit && listingId) {
            const result = await updateListing({ id: listingId, body: values }).unwrap();
            navigate(`/listings/${result.id}`);
        } else {
            const result = await createListing(values).unwrap();
            navigate(`/listings/${result.id}`);
        }
    };

    if (isEdit && isLoadingExisting) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ color: '#7A1F2B' }} />
            </Box>
        );
    }

    const error = createError || updateError;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#F0EDEE' }}>
            <Container maxWidth="sm" sx={{ py: 5 }}>
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
                    sx={{ borderRadius: 3, border: '1px solid #E3DDDE', bgcolor: '#FFFFFF', p: { xs: 3, sm: 5 } }}
                >
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: '#2B2B2B', mb: 3 }}>
                        {isEdit ? 'Edit listing' : 'Create a new listing'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            Something went wrong saving this listing. Check the fields and try again.
                        </Alert>
                    )}
                    <ListingForm initial={existing} onSubmit={handleSubmit} />
                </Paper>
            </Container>
        </Box>
    );
}