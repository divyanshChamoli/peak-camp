
interface BigButton{
    label: string
    onClick(e: React.MouseEvent<HTMLButtonElement>): void
}

export default function BigButton({label, onClick}: BigButton){
    return(
        <button className="w-full text-white bg-secondary p-1 my-2 text-lg hover:bg-[#956B2F] transition-colors" onClick={onClick}>{label}</button>
    )
}