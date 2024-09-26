
interface TextArea{
    label: string,
    placeholder: string,
    rows: number,
    value: string,
    onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
}

export default function TextArea({label, placeholder, rows, value, onChange}: TextArea){
    return(
        <div>
            <div className="text-white pb-2 text-sm">{label}</div>
            <textarea className="w-full p-1 pl-3 rounded-md text-black" placeholder={placeholder} rows={rows} required value={value} onChange={onChange}></textarea>
        </div>
    )
}