
interface BigButton{
    label: string
    onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

export default function BigButton({label, onClick}: BigButton){
    return(
        <button className="w-full text-white bg-secondary p-1 my-2 text-lg" onClick={onClick}>{label}</button>
    )
}