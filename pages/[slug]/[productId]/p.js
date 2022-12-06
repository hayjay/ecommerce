import React from 'react'
import {useRouter} from 'next/router'
import ProductDetailsPage from '../../../src/containers/ProductDetailsPage'

function Index() {
    const router = useRouter();
    // console.log(router.query)
    return (
        <>
            <ProductDetailsPage {...router.query} />
        </>
    )
}

export default Index;
