import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Alert, Rating } from '@mui/material';
import { useCreateReviewMutation } from '../reviewsApi';

const reviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000).optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewFormPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [createReview, { error }] = useCreateReviewMutation();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 0, comment: '' },
    });

    const onSubmit = async (values: ReviewFormValues) => {
        // listingId isn't known from the order route alone; passed as 0 here since the
        // cache-invalidation tag isn't critical for this single-review flow. If you want
        // the listing's review list to refresh automatically after this, look up the
        // listingId (e.g. from the order details) and pass it through instead of 0.
        await createReview({
            listingId: 0,
            orderId: Number(orderId),
            rating: values.rating,
            comment: values.comment,
        }).unwrap();
        navigate('/');
    };

    return (
        <Container className="py-8">
            <Typography variant="h4" component="h1" className="mb-6">
                Leave a review
            </Typography>
            {error && (
                <Alert severity="error" className="mb-4">
                    Couldn't submit your review. This order may not be eligible, or may already
                    have a review.
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} className="grid max-w-2xl gap-4">
                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <Rating
                            value={field.value}
                            onChange={(_event, value) => field.onChange(value ?? 0)}
                            aria-label="Review rating"
                        />
                    )}
                />
                {errors.rating && (
                    <Typography color="error" variant="caption">
                        Please choose a rating.
                    </Typography>
                )}
                <TextField
                    label="Comment"
                    multiline
                    minRows={4}
                    slotProps={{ htmlInput: { maxLength: 1000 } }}
                    {...register('comment')}
                />
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Submit review
                </Button>
            </Box>
        </Container>
    );
}