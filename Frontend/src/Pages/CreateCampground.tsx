import { useState } from "react";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";
import axios from "axios";
import Button from "../Components/Button";
import NavBar from "../Components/Navbar";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputFile from "../Components/InputFile";

export default function CreateCampground() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);  

  const onClick = async () => {
    try {
      if (!images) {
        throw new Error("Atleast 1 image is needed !");
      }
      console.log("Images uploaded: ", images.length)
      const campData = new FormData();
      for (let i = 0; i < images.length; i++) {
        campData.append('images', images[i]);
      }
      campData.append("campName", name);
      campData.append("campDescription", description);
      campData.append("campLocation", location);
      campData.append("campPrice", price.toString());

      const res = await axios.post(
        "http://localhost:3000/camp",
        campData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!res.data.Error) {
        navigate("/home");
      }
      setDescription("");
      setName("");
      setLocation("");
      setPrice(0);
    } catch (e) {
      alert("Error!, Please try again");
      console.log(e);
    }
  };

  return (
    <div className=" bg-customYellow pb-10">
      <NavBar />
      <div className="flex justify-center items-center mt-6">
        <div className="h-[75%] w-1/2 bg-primary shadow-md shadow-black rounded-md">
          <div className="p-6">
            <Heading label="Add Campground" />
            <InputBox
            label="Name"
            placeholder="Name of the campground"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <InputBox
            label="Location"
            placeholder="Address, or latitube longitude to display on Google Maps"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <InputBox
            label="Price"
            placeholder="Price in INR"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            {/* <InputBox
            label="Image Url"
            placeholder="Paste the website url of the image here"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            /> */}
            {/* <input type={"file"} placeholder="Add images for your campground" /> */}

            {/* Send file input */}
            <InputFile 
              onChange={(e) =>{ 
                setImages(e.target.files)
                console.log(images)
                }
              }
            />
            <TextArea
            label="Description"
            placeholder="Share your experience!"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              className="w-full rounded-sm mb-3 text-lg"
              size={"icon"}
              onClick={onClick}
            >
              Add Campground!
            </Button>
            <Button size={"iconSmall"} onClick={() => navigate("/home")}>
              <ChevronLeft size={15} /> Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
