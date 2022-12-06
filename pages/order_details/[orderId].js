import React from 'react'
import {useRouter} from 'next/router'
import OrderDetailsPage from '../../src/containers/OrderDetailsPage'

function OrderDetails() {
    const router = useRouter()
    return (
        <>
            <OrderDetailsPage {...router.query} />
        </>
    )
}

export default OrderDetails
