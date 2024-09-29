import z from "zod"

export const SignupBodySchema=z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().email(),
    password: z.string().min(6)
})

export const SigninBodySchema=z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

export const CreateCampBodySchema=z.object({    
    campName: z.string(),
    campDescription: z.string(),
    campLocation: z.string(),
    campPrice: z.number(),
    campImageUrl: z.string().url()
})

export const UpdateCampBodySchema=CreateCampBodySchema.partial()

export const CreateReviewBodySchema=z.object({
    reviewText: z.string(),
    rating: z.number()
})

export const UpdateReviewBodySchema=CreateReviewBodySchema.partial()

export type CreateCampBodyType=z.infer<typeof CreateCampBodySchema> 
export type UpdateCampBodyType=z.infer<typeof UpdateCampBodySchema>
export type CreateReviewBodyType=z.infer<typeof CreateReviewBodySchema> 
export type UpdateReviewBodyType=z.infer<typeof UpdateReviewBodySchema>
