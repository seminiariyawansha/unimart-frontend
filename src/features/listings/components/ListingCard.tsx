import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Listing } from '../listingTypes';

const statusColors: Record<Listing['status'], { bg: string; text: string }> = {
    AVAILABLE: { bg: '#EAF4EA', text: '#2E7D32' },
    RESERVED: { bg: '#FFF4E5', text: '#B8710A' },
    SOLD: { bg: '#F0EDEE', text: '#6E6E6E' },
    ARCHIVED: { bg: '#F0EDEE', text: '#9E9E9E' },
};

export function ListingCard({ listing }: { listing: Listing }) {
    const statusStyle = statusColors[listing.status];

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid #E3DDDE',
                bgcolor: '#FFFFFF',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(122, 31, 43, 0.10)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <CardContent
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    p: 3,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600, color: '#2B2B2B', lineHeight: 1.3 }}
                    >
                        {listing.title}
                    </Typography>
                    <Chip
                        size="small"
                        label={listing.status}
                        sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.text,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                        }}
                    />
                </Box>

                <Typography variant="body2" sx={{ color: '#9E9E9E', fontWeight: 500 }}>
                    {listing.categoryName}
                </Typography>

                <Typography
                    sx={{
                        color: '#6E6E6E',
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {listing.description}
                </Typography>

                <Typography variant="h6" sx={{ color: '#7A1F2B', fontWeight: 700 }}>
                    LKR {listing.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                </Typography>

                <Button
                    component={Link}
                    to={`/listings/${listing.id}`}
                    fullWidth
                    sx={{
                        mt: 0.5,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: '#7A1F2B',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#5E1721', boxShadow: 'none' },
                    }}
                >
                    View listing
                </Button>
            </CardContent>
        </Card>
    );
}