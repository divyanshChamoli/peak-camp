
interface TextArea{
    label: string,
    placeholder: string,
    rows: number
    type?: string
}

export default function TextArea({label, placeholder,rows, type="text"}: TextArea){
    return(
        <div>
            <div className="text-white pb-2 text-sm">{label}</div>
            <textarea className="w-full p-1 pl-3 rounded-md" placeholder={placeholder} rows={rows} required></textarea>
        </div>
    )
}