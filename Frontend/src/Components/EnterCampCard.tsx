
import { Carousel } from "@material-tailwind/react";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import { SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

interface EnterCampCardProps {
  campId: string;
}

interface Camp {
  campName: string;
  campDescription: string;
  campLocation: string;
  campPrice: number;
  images: {
    fileName: string;
    url: string;
  }[];
  geometry: {
    type: "Point";
    coordinates: number[];
  };
  reviewsOnCamp: string[];
  user: string;
}

export default function EnterCampCard({ campId }: EnterCampCardProps) {  
  const { currentUserId } = useAuth();
  const navigate = useNavigate();

  const [camp, setCamp] = useState<Camp>();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/camp/${campId}`);
      setCamp(response.data.camp);
      const res = await axios.get(
        `/user/${response.data.camp.user}`
      );
      setFirstName(res.data.user.firstName);
    }

    getData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/camp/${campId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!res.data.Error) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative">
      <figure className="p-4">
        <Carousel
          transition={{ duration: 1 }}
          autoplay={true}
          loop={true}
          className="rounded-xl"
        >
          {camp?.images.map((image) => {
            return (
              <img
                src={image.url}
                alt={`Camping images`}
                key={image.fileName}
                className="h-full w-full object-cover"
              />
            );
          })}
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
        {currentUserId === camp?.user ? (
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Button
                size={"icon"}
                className="bg-green-700 hover:bg-green-900"
                onClick={() => navigate(`/edit/${campId}`)}
              >
                Edit &nbsp; <SquarePen size={18} />
              </Button>
              <Button
                size={"icon"}
                className="bg-red-600 hover:bg-red-900"
                onClick={handleDelete}
              >
                Delete &nbsp; <Trash size={18} />
              </Button>
            </div>
          </div>
        ) : null}
          <figcaption className=" text-white text-sm text-right">
            {" "}
            Submitted by{" "}
            <span className="underline capitalize  ">{firstName}</span>{" "}
          </figcaption>
      </figure>
    </div>
  );
}
