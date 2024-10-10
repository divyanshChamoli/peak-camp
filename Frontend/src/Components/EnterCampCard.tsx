import { Carousel } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface EnterCampCardProps {
  campId: string;
}

interface Camp {
  campName: string;
  campDescription: string;
  campLocation: string;
  campPrice: number;
  campImageUrl: string;
  user: string;
  // reviewsOnCamp: Types.ObjectId[]
  //image
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
        {/* <img className="object-cover"  src={camp?.campImageUrl} alt={camp?.campName} /> */}
        <Carousel transition={{duration: 1}} autoplay={true} loop={true} className="rounded-xl">
          <img
            src={camp?.campImageUrl}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
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
