import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import Breeds from './breeds.component';
import BreedDetails from './breedsdetails.component';

const MyRoute: React.FC = () => {

    return (
        <Router>
            <Route path="/" default={true} >
                <Home />
            </Route>
            <Route path="/breeds" >
                <Breeds />
            </Route>
            <Route path="/breed-details">
                <BreedDetails />
            </Route>
        </Router>
    );
}

function Home() {
    return <Redirect to='/breeds' />;
}
export default MyRoute;