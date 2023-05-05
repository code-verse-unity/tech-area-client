import { Route, Routes as ReactRoutes, useLocation } from "react-router-dom";
import Home from "./Home";

const Routes = () => {
  const location = useLocation();

  return (
    <ReactRoutes location={location} key={location.key}>
      <Route path="/" element={<Home />} />
    </ReactRoutes>
  );
};

export default Routes;
