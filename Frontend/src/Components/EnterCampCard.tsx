import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface EnterCampCardProps {
  campId: string;
}

interface Camp{
  campName: string,
  campDescription: string,
  campLocation: string,
  campPrice: number,
  images: {
      fileName: string,
      url: string 
  }[],
  geometry: {
      type: 'Point',
      coordinates: number[]
  }
  reviewsOnCamp: string[]
  user: string
}

export default function EnterCampCard({ campId }: EnterCampCardProps) {
  const [camp, setCamp] = useState<Camp>();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`http://localhost:3000/camp/${campId}`);
      setCamp(response.data.camp);
      const res = await axios.get(
        `http://localhost:3000/user/${response.data.camp.user}`
      );
      setFirstName(res.data.user.firstName);
    }

    getData();
  }, []);

  return (
    <div>
      <figure className="p-4">
        <Carousel transition={{duration: 1}} autoplay={true} loop={true} className="rounded-xl">
          {
            camp?.images.map((image)=>{
              return(
                <img
                  src={image.url}
                  alt={`Camping images`}
                  key={image.fileName}
                  className="h-full w-full object-cover"
                />
              )
            })
          }
        </Carousel>
        <figcaption className=" text-white text-xl text-right font-montserrat pt-2">
          {" "}
          ₹{camp?.campPrice}/night{" "}
        </figcaption>
        <figcaption className="font-sriracha text-3xl text-white">
          {" "}
          {camp?.campName}{" "}
        </figcaption>
        <figcaption className="text-white bg-secondary p-4 my-4 text-sm">
          {" "}
          {camp?.campDescription}{" "}
        </figcaption>
        <figcaption className=" text-white text-sm text-right">
          {" "}
          Submitted by{" "}
          <span className="underline capitalize  ">{firstName}</span>{" "}
        </figcaption>
      </figure>
    </div>
  );
}
