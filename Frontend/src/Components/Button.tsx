import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

//SIZE
// Width: full, auto => accordingly put padding and margin

//VARIANT
// Color: brown, transparent, green => accordingly put hover states and text-color
// Rounded: Square, rounded-md, rounded-l-full & rounded-r-full


const buttonStyles= cva(["transition-colors w-auto flex justify-center items-center my-2 "], {
    variants: {
        variant:{
            default: [ "bg-secondary hover:bg-secondary-hover" ],
            ghost: [ " bg-transparent hover:bg-gray-100 text-black"],
            green: [ "bg-green-900 hover:bg-green-800"]
        },
        size: {
            //no icon only text
            default: [" px-20 py-2 rounded-l-full rounded-r-full text-md "],
            icon: [" px-3 py-1.5 rounded-md "] , 
            iconSmall: ["w-16 text-sm mt-2 p-1 rounded-sm"]
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})


export default function Button({size, variant,className, ...props}: ButtonProps){
    return(
        <button {...props} className={ twMerge( buttonStyles({size, variant}) , className) }/>
    )
}