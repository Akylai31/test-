import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { productsContext } from "../../context/ProductsContext";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        backgroundSize: "media",
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
}));

export default function ProductCard({ item }) {
    const classes = useStyles();

    const { addProductToCart, checkProductInCart} = useContext(productsContext)

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography align="center" variant="h5">
                        {item.title}
                    </Typography>
                }
                subheader={
                    <Typography align="center">{item.author}</Typography>
                }
            />
            <CardMedia
                className={classes.media}
                image={item.image}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                </Typography>
            </CardContent>
            <Typography variant="h5">{item.price} som</Typography>
            <CardActions disableSpacing>
                <IconButton 
                aria-label="share"
                onClick = {() => addProductToCart(item)}
                color={checkProductInCart(item.id) ? "secondary" : "primary"}
                >
                    <ShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
