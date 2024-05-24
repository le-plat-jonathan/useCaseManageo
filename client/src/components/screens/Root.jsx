import { Outlet } from "react-router-dom";
import Navigation from "../elements/Navigation";

export default function Root() {
  return (
    <>
        <header>
            <Navigation/>
        </header>
        <div>
            <Outlet/>
        </div>
    </>
  );
}