
interface InputBox{
    label: string,
    placeholder: string,
    type?: string
}

export default function InputBox({label, placeholder, type="text"}: InputBox){
    return(
        <div>
            <div className="text-white pb-2 text-sm">{label}</div>
            <input type={type} placeholder={placeholder}
            className="w-full p-1 pl-3 rounded-md"/>
        </div>
    )
}