
interface InputBox{
    label: string,
    placeholder: string,
    type?: string,
    value: string | number,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export default function InputBox({label, placeholder, type="text", value, onChange}: InputBox){
    return(
        <div>
            <div className="text-white pb-2 text-sm">{label}</div>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange}
            className="w-full p-1 pl-3 rounded-md text-black"/>
        </div>
    )
}