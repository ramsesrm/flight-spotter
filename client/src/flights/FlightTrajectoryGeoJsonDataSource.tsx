import * as React from "react";

import { GetFlightTrajectory } from "../data/generated-types";
import GeoJsonDataSource from "../map/GeoJsonDataSource";

interface IFlightTrajectoryGeoJsonDataSourceProps {
  source: string;
  id: string;
}

const FlightTrajectoryGeoJsonDataSource: React.FC<
  IFlightTrajectoryGeoJsonDataSourceProps
> = ({ source, id, children }) => {
  return (
    <GetFlightTrajectory.Component
      variables={{
        input: {
          id
        }
      }}
    >
      {({ data }) => {
        const featureCollection = convert(data.flight);
        return (
          <GeoJsonDataSource id={source} data={featureCollection}>
            {children}
          </GeoJsonDataSource>
        );
      }}
    </GetFlightTrajectory.Component>
  );
};

const convert = (
  flight: GetFlightTrajectory.Flight
): GeoJSON.Feature<GeoJSON.LineString> => {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates:
        flight && flight.trajectory
          ? [
              ...flight.trajectory.paths.map(path => [
                path.coordinates.longitude,
                path.coordinates.latitude
              ])
            ]
          : []
    }
  };
};

export default FlightTrajectoryGeoJsonDataSource;