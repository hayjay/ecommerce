import React from 'react'
import {useRouter} from 'next/router'
import ProductListPage from '../src/containers/ProductListPage'

export default function Index(props) {
    const router = useRouter()
    console.log(router.query)

    return (
        <ProductListPage {...router.query} />
    )
}
