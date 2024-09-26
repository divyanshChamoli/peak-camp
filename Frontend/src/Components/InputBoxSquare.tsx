
interface InputBoxSquare{
    placeholder: string,
    type?: string,
    value: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>):void
}

export default function InputBoxSquare({placeholder, type="text", value, onChange}: InputBoxSquare){
    return(
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full p-3 placeholder-slate-600 text-black"/>
    )
}