
interface ButtonCreateAccount{
    placeholder: string
}

export default function ButtonCreateAccount({placeholder}: ButtonCreateAccount){
    return(
        <button className=" bg-secondary w-full text-sm my-2 p-3 rounded-md">
            {placeholder}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 inline-block pb-1 pl-0 ml-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    )
}