interface Heading{
    label: string
}

export default function Heading({label}: Heading){
    return(
       <h2 className="text-white text-center text-4xl p-3 font-sriracha">{label}</h2> 
    )
}