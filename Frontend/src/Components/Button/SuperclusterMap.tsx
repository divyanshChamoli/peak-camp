//Copied reac-map-gl cluster examples. Again type errors. Never ran



// import * as React from 'react';
// import {useRef} from 'react';
// import {createRoot} from 'react-dom/client';
// import {Map, Source, Layer} from 'react-map-gl';
// import type {MapRef} from 'react-map-gl';
// import type {GeoJSONSource} from 'react-map-gl';

// const mapBoxAccessToken = "pk.eyJ1IjoiZGl2eWFuc2gwMDgiLCJhIjoiY2xnMmtrNm50MDBlajNscXlmbTJzdHl1MCJ9.-UvFiDZ4Z83OYJ9y3mZYew"
// import type {LayerProps} from 'react-map-gl';
// import { MapGeoJSONFeature, MapMouseEvent } from 'react-map-gl/dist/esm/types';

// export const clusterLayer: LayerProps = {
//   id: 'clusters',
//   type: 'circle',
//   source: 'earthquakes',
//   filter: ['has', 'point_count'],
//   paint: {
//     'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
//     'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
//   }
// };

// export const clusterCountLayer: LayerProps = {
//   id: 'cluster-count',
//   type: 'symbol',
//   source: 'earthquakes',
//   filter: ['has', 'point_count'],
//   layout: {
//     'text-field': '{point_count_abbreviated}',
//     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//     'text-size': 12
//   }
// };

// export const unclusteredPointLayer: LayerProps = {
//   id: 'unclustered-point',
//   type: 'circle',
//   source: 'earthquakes',
//   filter: ['!', ['has', 'point_count']],
//   paint: {
//     'circle-color': '#11b4da',
//     'circle-radius': 4,
//     'circle-stroke-width': 1,
//     'circle-stroke-color': '#fff'
//   }
// };

// export function SuperclusterMap(){
//     const mapRef = useRef<MapRef>(null);

// //     const onClick = (event) => {
// //     const feature = event.features[0];
// //     const clusterId = feature.properties.cluster_id;

// //     const mapboxSource = mapRef.current ? mapRef.current.getSource('earthquakes') as GeoJSONSource : null;

// //     mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
// //       if (err) {
// //         return;
// //       }

// //       mapRef.current.easeTo({
// //         center: feature.geometry.coordinates,
// //         zoom,
// //         duration: 500
// //       });
// //     });
// //   };
    
//     return(
//         <div>
//              <Map
//                 initialViewState={{
//                 latitude: 40.67,
//                 longitude: -103.59,
//                 zoom: 3
//                 }}
//                 mapStyle="mapbox://styles/mapbox/dark-v9"
//                 mapboxAccessToken={mapBoxAccessToken}
//                 interactiveLayerIds={[clusterLayer.id as string]}
//                 onClick={(event) => {
//                     const feature = event.features && event.features[0]  ;
//                     const clusterId = feature && feature.properties && feature.properties.cluster_id;
                
//                     const mapboxSource = mapRef.current ? mapRef.current.getSource('earthquakes') as GeoJSONSource : null;
                
//                     mapboxSource && mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
//                       if (err) {
//                         return;
//                       }
                
//                       mapRef.current && mapRef.current.easeTo({
//                         center: feature && feature.geometry?.coordinates
//                         zoom: 3,
//                         duration: 500
//                       });
//                     });
//                   };}
//                 ref={mapRef}
//             >
//                 <Source
//                 id="earthquakes"
//                 type="geojson"
//                 data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
//                 cluster={true}
//                 clusterMaxZoom={14}
//                 clusterRadius={50}
//                 >
//                 <Layer {...clusterLayer} />
//                 <Layer {...clusterCountLayer} />
//                 <Layer {...unclusteredPointLayer} />
//                 </Source>
//             </Map>
//         </div>
//     )
// }