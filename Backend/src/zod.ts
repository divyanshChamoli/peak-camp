import z from "zod"

export const authorizationHeaderSchema= z.string()

export const CreateCampBodySchema=z.object({
    campName: z.string(),
    campDescription: z.string(),
    campLocation: z.string(),
    campPrice: z.number(),
})

export const UpdateCampBodySchema=CreateCampBodySchema.partial()

export type CreateCampBodyType=z.infer<typeof CreateCampBodySchema> 
export type UpdateCampBodyType=z.infer<typeof UpdateCampBodySchema>

export const CreateReviewBodySchema=z.object({
    reviewText: z.string(),
    rating: z.number()
})

export type CreateReviewBodyType=z.infer<typeof CreateReviewBodySchema> 

export const LoginCredentialSchema=z.object({
    username: z.string(),
    password: z.string().min(6)
})