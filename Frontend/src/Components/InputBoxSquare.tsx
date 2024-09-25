
interface InputBoxSquare{
    placeholder: string,
    type?: string
}

export default function InputBoxSquare({placeholder, type="text"}: InputBoxSquare){
    return(
        <input type={type} placeholder={placeholder}
        className="w-full p-3 placeholder-slate-600"/>
    )
}