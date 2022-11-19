import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import Circle from 'ol/geom/Circle'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import OSMMap from 'ol/Map'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Circle as CircleStyle, Stroke, Style } from 'ol/style'
import View from 'ol/View'

const Body = styled.div`
    display: grid;
`

export const Map = () => {
    const [ref, setRef] = useState<any>(null)

    useEffect(() => {
        const image = new CircleStyle({
            radius: 5,
            fill: undefined,
            stroke: new Stroke({ color: 'red', width: 1 }),
        })

        const styles = {
            Point: new Style({
                image: image,
            }),
        }

        const styleFunction = function (feature: any) {
            return (styles as any)[feature.getGeometry().getType()]
        }

        const geojsonObject = {}

        if (!ref) return

        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geojsonObject),
        })

        vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)))

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: styleFunction,
        })

        const map = new OSMMap({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            target: ref,
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        })

        return () => {
            map.dispose()
        }
    }, [ref])

    return <Body ref={setRef}></Body>
}
