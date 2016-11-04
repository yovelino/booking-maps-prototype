import * as React from "react";

export interface PathProps {
    map?: google.maps.Map;
    track?: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>;
}

export class PathComponent extends React.Component<PathProps, {}> {

    private path: google.maps.Polyline;

    constructor(props: PathProps){
        super(props);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount - path', this);
        if (this.path) {
            this.path.setMap(null);
        }
    }

    componentDidUpdate(prevProps: PathProps) {
        console.log('componentDidUpdate path', prevProps, this.props);
        if ((this.props.map !== prevProps.map) ||
            (this.props.track !== prevProps.track)) {
            if(this.props.track && this.props.map){

                let pathCoordinates: google.maps.LatLngLiteral[] = [];
                this.props.track.features[0].geometry.coordinates.forEach( (coordinate: any) => {
                    const latLngLiteral = {lng: coordinate[0], lat: coordinate[1]};
                    pathCoordinates.push(latLngLiteral);
                })

                this.path = new google.maps.Polyline({
                    path: pathCoordinates,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });


                this.path.setMap(this.props.map);

                var bounds = new google.maps.LatLngBounds();
                this.path.getPath().forEach( (coord) => {
                    bounds.extend(coord);
                })
                this.props.map.fitBounds(bounds);

            }
        }
    }

    render(): null {
        return null;
    }
}