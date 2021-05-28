import { GeoJsonObject } from "geojson";
import L, { LatLngExpression, PathOptions, LatLng } from "leaflet";
import { GeoJSON,  } from "react-leaflet";
import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";

import { Polygon, } from "leaflet";
import "geojson";

interface InvertedPolygonProps {
    data: LatLng[]
}

export default function InvertedCountry(props: InvertedPolygonProps) {
    const context = useLeafletContext()
  
    useEffect(() => {
//      const bounds = L.latLng(props.center).toBounds(props.size)
      const invPoly = new L.Polygon(props.data)
      const container = context.layerContainer || context.map
      container.addLayer(invPoly)
  
      return () => {
        container.removeLayer(invPoly)
      }
    })
  
    return null
  }
