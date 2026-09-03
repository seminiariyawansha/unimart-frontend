import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField } from '@mui/material';
import type { ListingInput } from '../listingTypes';

const listingSchema = z.object({
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().min(1).max(5000),
    price: z.coerce.number().min(0),
    categoryId: z.coerce.number().int().positive(),
});

type ListingFormInput = z.input<typeof listingSchema>;
type ListingFormOutput = z.output<typeof listingSchema>;

interface Props {
    initial?: Partial<ListingFormInput>;
    onSubmit: (values: ListingInput) => Promise<void> | void;
}

const fieldSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        '&.Mui-focused fieldset': { borderColor: '#7A1F2B' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#7A1F2B' },
};

export function ListingForm({ initial, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ListingFormInput, unknown, ListingFormOutput>({
        resolver: zodResolver(listingSchema),
        defaultValues: initial,
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit((values) => onSubmit(values))}
            sx={{ display: 'grid', gap: 2.5 }}
        >
            <TextField
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={fieldSx}
                {...register('title')}
            />
            <TextField
                label="Description"
                multiline
                minRows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={fieldSx}
                {...register('description')}
            />
            <TextField
                label="Price (LKR)"
                type="number"
                slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={fieldSx}
                {...register('price')}
            />
            <TextField
                label="Category ID"
                type="number"
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
                sx={fieldSx}
                {...register('categoryId')}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                size="large"
                sx={{
                    py: 1.3,
                    mt: 1,
                    borderRadius: 2,
                    bgcolor: '#7A1F2B',
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#5E1721', boxShadow: 'none' },
                    '&:disabled': { bgcolor: '#C9A9AD' },
                }}
            >
                {isSubmitting ? 'Saving…' : 'Save listing'}
            </Button>
        </Box>
    );
}