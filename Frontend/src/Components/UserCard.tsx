import Avatar, { genConfig } from "react-nice-avatar";

interface UserCardProps {
  id: number;
  name: string;
  email: string;
}

export default function UserCard({ name, email }: UserCardProps) {
  let config;
  if(name === "Pranjali Negi"){
      config = genConfig({
      "sex": "woman",
      "faceColor": "#F9C9B6",
      "earSize": "small",
      "eyeStyle": "smile",
      "noseStyle": "short",
      "mouthStyle": "laugh",
      "shirtStyle": "short",
      "glassesStyle": "round",
      "hairColor": "#000",
      "hairStyle": "womanLong",
      "hatStyle": "none",
      "hatColor": "#000",
      "eyeBrowStyle": "upWoman",
      "shirtColor": "#F4D150",
      "bgColor": "linear-gradient(45deg, #178bff 0%, #ff6868 100%)"
    })
  }
  else if(name.includes("Devesh")){
    config = genConfig({
      sex: "man",
      faceColor: "#AC6651",
    })
  }
  else if(name.includes("Deepak")){
    config = genConfig({
      sex: "man",
    })
  }
  else{
    config = genConfig(email)   
  }
  

  return (
    <div className="w-full bg-[#FAEDCD] rounded-lg p-12 flex flex-col justify-center items-center relative shadow-lg shadow-black hover:scale-95 transition-all duration-100">
      <div className="mb-8">
        <Avatar className="rounded-full h-36 w-36" {...config} />{" "}
      </div>
      <div className="text-center">
        <p className="text-xl text-[#99714D] font-bold mb-2 "> {name} </p>
        <p className="text-base text-[#99714D] font-normal"> {email} </p>
      </div>
    </div>
  );
}
