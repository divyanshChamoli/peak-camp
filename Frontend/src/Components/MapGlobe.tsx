import { useEffect, useState } from "react"
import ReactMapGL, { Marker, NavigationControl, Popup, FullscreenControl} from "react-map-gl"
import { Tent } from "lucide-react"
import axios from "axios"

const mapBoxAccessToken = "pk.eyJ1IjoiZGl2eWFuc2gwMDgiLCJhIjoiY2xnMmtrNm50MDBlajNscXlmbTJzdHl1MCJ9.-UvFiDZ4Z83OYJ9y3mZYew"

interface Camp{
    _id: string,
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

export default function MapGlobe(){

    const [viewPort, setViewPort] = useState({
        latitude: 28.5247,
        longitude:  77.1854,
        zoom: 3, 
        projection: "globe"
    })

    const [camps, setCamps] = useState<Camp[]>()
    const [selectedCamp, setSelectedCamp] = useState<Camp>()
    const [showPopup, setShowPopup] = useState<boolean>(true);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchCampData(){
            const response= await axios.get(`http://localhost:3000/camp/`)
            setCamps(response.data.camps)
            setLoading(false)
        }
        fetchCampData()
    },[])
    
    return(
        // h,w are compulsory here, otherwise map wont render, Cant give inherit, auto etc. Has to be a hardcoded value
        <div className="h-[30rem] w-5/6">
            {loading ? <>Loading...</> :
                <ReactMapGL  initialViewState={viewPort} mapboxAccessToken={mapBoxAccessToken} 
                    mapStyle="mapbox://styles/mapbox/dark-v11" 
                >
                    {camps && camps.map((camp)=>{
                        return(
                            <Marker longitude={camp.geometry.coordinates[0]} latitude={camp.geometry.coordinates[1]}
                            key={camp._id} anchor={"left"}
                            >
                                <button className="h-40 w-40" onClick={(e)=>{
                                    e.preventDefault()
                                    setSelectedCamp(camp)
                                    setShowPopup(true)
                                }}>
                                    <Tent color="green"/>
                                </button>
                            </Marker>
                        )
                    })}  

                    {showPopup && selectedCamp && (
                        <Popup 
                            anchor="bottom"
                            closeOnClick={false}
                            onClose={() => setShowPopup(false)}
                            longitude={selectedCamp.geometry.coordinates[0]} latitude={selectedCamp.geometry.coordinates[1]}
                        >
                            <h2 className="text-black font-bold text-xl"> {selectedCamp.campName} </h2>
                            <p className="text-black font-semibold"> {selectedCamp.campLocation} </p>
                        </Popup>         
                    )} 
                    <NavigationControl position={"top-left"} style={{backgroundColor: '#C5C5C5'}} />
                    <FullscreenControl style={{backgroundColor: '#C5C5C5'}} />
                </ReactMapGL>
            }
        </div>
    )

}
