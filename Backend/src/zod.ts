import z from "zod"

export const authorizationHeaderSchema= z.string().min(8)

export const campBodySchema=z.object({
    campName: z.string(),
    campDescription: z.string(),
    campLocation: z.string(),
    campPrice: z.number(),
})

export type campBodyType=z.infer<typeof campBodySchema> 

export const LoginCredentialSchema=z.object({
    username: z.string(),
    password: z.string().min(6)
})