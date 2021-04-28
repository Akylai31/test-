import React, { useContext, useEffect, useState } from "react";
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from "@material-ui/core";

import { useHistory } from 'react-router-dom';
import { productsContext } from "../../context/ProductsContext";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
    const { getProducts, productsData, paginationPages } = useContext(productsContext);
    const history = useHistory()
    const [page, setPage] = useState(getPage());

    console.log(history)

    function getPage() {
        const search = new URLSearchParams(history.location.search)
        return search.set('_page','' )
    }

    const handlePage = (e, page) => {
        const search = new URLSearchParams(history.location.search)
        search.set('_page', page)
        history.push(`${history.location.pathname}?${search.toString()}`)
        setPage(page)
        getProducts(history)
    }
    useEffect(() => {
        console.log(history)
        getProducts(history);
    }, []);

    return (
            <>
        <Grid container spacing={3}>
            {productsData.map((item) => (
                <ProductCard item={item} key={item.id} />
            ))}
        </Grid>
            <Pagination page={+page} onChange={handlePage} count={paginationPages} color="primary" />
            </>
    );
};

export default ProductList;
