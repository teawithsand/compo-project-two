import React from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { type LatLngExpression } from 'leaflet';

/* MUST CONTAIN IN HEAD
*<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
*/


// TODO: rename connection to travel

const getRandomColor = () => {
    return `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
};

export interface Connections {
    connections: Array<{ start: LatLngExpression, end: LatLngExpression }>

}

export const ConnectionsMap = ({ connections }: Connections) => {
    // console.dir(connections);
    let arrows = new Array();
    for (const [i, v] of connections.entries()) {
        const color = getRandomColor();
        const onClick = () => console.log(`clicked ${i}`);
        let arrow = <>
            <Polyline
                positions={[
                    [v.start, v.end]
                ]}
                weight={9}
                color={color}
                eventHandlers={{ click: onClick }}
            />
            <Polyline
                positions={[v.end, v.end]}
                color={color}
                weight={25}
                eventHandlers={{ click: onClick }}
            />
        </>;
        arrows.push(arrow);
    }
    console.dir(arrows);

    return <MapContainer center={[52.408, 16.905]} zoom={5} scrollWheelZoom={true} style={{ height: "500px", width: "500px" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {arrows}
    </MapContainer>;
};