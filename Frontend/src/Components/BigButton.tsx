
interface BigButton{
    label: string
}

export default function BigButton({label}: BigButton){
    return(
        <button className="w-full text-white bg-secondary p-1 my-2 text-lg">{label}</button>
    )
}