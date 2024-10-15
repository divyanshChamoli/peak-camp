import { useEffect, useState } from "react"
import ReactMapGL, { FullscreenControl, Marker, NavigationControl, Popup } from "react-map-gl"
import { Tent } from "lucide-react"
import axios from "../api/axios";

const mapBoxAccessToken = "pk.eyJ1IjoiZGl2eWFuc2gwMDgiLCJhIjoiY2xnMmtrNm50MDBlajNscXlmbTJzdHl1MCJ9.-UvFiDZ4Z83OYJ9y3mZYew"


interface Camp{
    campName: string,
    campDescription: string,
    campLocation: string,
    campPrice: number,
    campImageUrl: string,
    geometry: {
        type: 'Point',
        coordinates: number[]
    }
    reviewsOnCamp: string
    user: string
    //image
}

interface MapProps{
    campId: string
}

export default function Map({campId}: MapProps){

    const [camp, setCamp] = useState<Camp>()
    const [showPopup, setShowPopup] = useState<boolean>(true);
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        async function fetchCampData(){
            const response= await axios.get(`/camp/${campId}`)
            setCamp(response.data.camp)
            setLoading(false)
        }
        fetchCampData()
    },[])
    
    return(
        <div className="h-screen w-screen">
           { loading ? <>Loading...</>  :
            <ReactMapGL initialViewState={{
                longitude:  camp?.geometry.coordinates[0],
                latitude: camp?.geometry.coordinates[1],
                zoom: 15, 
            }} mapboxAccessToken={mapBoxAccessToken}                     
                // mapStyle="mapbox://styles/mapbox/streets-v9"
                // mapStyle="mapbox://styles/mapbox/standard" 
                // mapStyle="mapbox://styles/mapbox/light-v11"                 
                // mapStyle="mapbox://styles/mapbox/navigation-night-v1"                 
                mapStyle="mapbox://styles/mapbox/outdoors-v12"                 
                
            >
                {
                    camp &&   
                    <Marker longitude={camp.geometry.coordinates[0]} latitude={camp.geometry.coordinates[1]}
                    key={campId} anchor={"left"} 
                    >
                        <button className="h-40 w-40" onClick={(e)=>{
                            e.preventDefault()
                            setShowPopup(true)
                        }}>
                            <Tent color="green" size={42}/>
                        </button>
                    </Marker>
                }


                {showPopup && camp && (
                    <Popup 
                        anchor={"bottom-right"}
                        closeOnClick={false}
                        onClose={() => setShowPopup(false)}
                        longitude={camp.geometry.coordinates[0]} latitude={camp.geometry.coordinates[1]}
                        className=""
                    >
                        <h2 className="text-black font-bold text-xl"> {camp.campName} </h2>
                        <p className="text-black font-semibold"> {camp.campLocation} </p>
                    </Popup>         
                )} 
                <NavigationControl position="top-left"/>
                <FullscreenControl />
            </ReactMapGL>
            }
        </div>
    )

}

