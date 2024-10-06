// // Tried to implement leah haliday version. Got type errors. Never ran






// import { Ref, RefAttributes, useRef, useState } from "react"
// import ReactMapGL, { Marker, NavigationControl, Popup, FullscreenControl, GeolocateControl, MapRef, useMap } from "react-map-gl"
// import { BBox, GeoJsonProperties } from "geojson";
// import * as cityData from "../assets/in.json"
// import { Tent } from "lucide-react"
// import useSupercluster from "use-supercluster";

// const mapBoxAccessToken = "pk.eyJ1IjoiZGl2eWFuc2gwMDgiLCJhIjoiY2xnMmtrNm50MDBlajNscXlmbTJzdHl1MCJ9.-UvFiDZ4Z83OYJ9y3mZYew"

// interface City {
//     city?: string;
//     lat: string;    
//     lng: string;
//     country?: string;
//     iso2?: string;
//     admin_name?: string;
//     capital?: string;
//     population?: string;
//     population_proper?: string;
// }

// export default function ClusterMap(){

//     const [viewPort, setViewPort] = useState({
//         latitude: 28.5247,
//         longitude:  77.1854,
//         zoom: 3, 
//         projection: "globe"
//     })

//     const [showPopup, setShowPopup] = useState<boolean>(true);
//     const [selectedCity, setSelectedCity] = useState<City>()

//     const points: Array<supercluster.PointFeature<GeoJsonProperties>> = cityData.cities.map(city => ({
//         type: "Feature",
//         properties: { cluster: false, crimeId: city.city, category: city.capital },
//         geometry: {
//           type: "Point",
//           coordinates: [
//             parseFloat(city.lng),
//             parseFloat(city.lat)
//           ]
//         }
//       }));

//     const {current: map} = useMap();
//     const bounds = map?.getMap().getBounds()?.toArray().flat() as BBox
//     // const bounds = map?.getBounds() 

    
//     const { clusters, supercluster } = useSupercluster({
//         points,
//         bounds,
//         zoom: viewPort.zoom,
//         options: { radius: 75, maxZoom: 20 }
//       });

//     console.log(bounds)
//     // const cityDataControlled= cityData.cities.slice(0,10)
//     return(
//         // h,w are compulsory here, otherwise map wont render, Cant give inherit, auto etc. Has to be a hardcoded value
//         <div className="h-[30rem] w-5/6">
//             <ReactMapGL  initialViewState={viewPort} mapboxAccessToken={mapBoxAccessToken} id="ReactMapGLId"
//                 mapStyle="mapbox://styles/mapbox/dark-v11" 
//                 // mapStyle="mapbox://styles/mapbox/streets-v9"
//                 // mapStyle="mapbox://styles/mapbox/outdoors-v12" 
//             >
//                 {cityData.cities.map((city)=>{
//                     return(
//                         <Marker longitude={parseFloat(city.lng)} latitude={parseFloat(city.lat)}
//                         key={city.city}  anchor={"left"}
//                         >
//                             <button className="h-40 w-40" onClick={(e)=>{
//                                 e.preventDefault()
//                                 setSelectedCity(city)
//                                 setShowPopup(true)
//                             }}>
//                                 <Tent color="green"/>
//                             </button>
//                         </Marker>
//                     )
//                 })}  

//                 {showPopup && selectedCity && (
//                     <Popup 
//                         // className="h-20 w-20"
//                         anchor="bottom"
//                         closeOnClick={false}
//                         onClose={() => setShowPopup(false)}
//                         longitude={parseFloat(selectedCity.lng)} latitude={parseFloat(selectedCity.lat)}
//                     >
//                         {/* <div className="text-black"> */}
//                             <h2 className="text-black"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, excepturi. </h2>
//                             <p className="text-black"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas necessitatibus nesciunt rem! Quos natus vero obcaecati sequi, tenetur placeat perspiciatis! </p>
//                         {/* </div> */}
//                     </Popup>         
//                 )} 
//                 <NavigationControl position={"top-left"} style={{backgroundColor: '#C5C5C5'}} />
//                 <FullscreenControl style={{backgroundColor: '#C5C5C5'}} />
//             </ReactMapGL>
//         </div>
//     )

// }
