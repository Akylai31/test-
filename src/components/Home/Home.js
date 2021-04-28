import React from "react";
import { Grid } from "@material-ui/core";
import Content from "./Content";
import Sidebar from "./Sidebar";

const Home = (props) => {
    return (
        <Grid container spacing={3}>
            <Sidebar {...props}/>
            <Content />
        </Grid>
    );
};

export default Home;
