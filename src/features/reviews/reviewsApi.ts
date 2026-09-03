import { baseApi } from '../../services/baseApi';
import type { Page } from '../listings/listingTypes';
import type { Review, ReviewCreateInput, ReviewUpdateInput } from './reviewTypes';

export const reviewsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getListingReviews: build.query<Page<Review>, { listingId: number; page?: number }>({
            query: ({ listingId, page = 0 }) => ({
                url: `listings/${listingId}/reviews`,
                params: { page, size: 10 },
            }),
            providesTags: (_result, _error, { listingId }) => [
                { type: 'Review', id: `LISTING-${listingId}` },
            ],
        }),
        createReview: build.mutation<Review, ReviewCreateInput & { listingId: number }>({
            query: ({ listingId: _listingId, ...body }) => ({
                url: 'reviews',
                method: 'POST',
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: 'Review', id: `LISTING-${arg.listingId}` },
            ],
        }),
        updateReview: build.mutation<Review, { id: number; body: ReviewUpdateInput }>({
            query: ({ id, body }) => ({ url: `reviews/${id}`, method: 'PUT', body }),
            invalidatesTags: ['Review'],
        }),
        deleteReview: build.mutation<void, number>({
            query: (id) => ({ url: `reviews/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useGetListingReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApi;