import { useEffect, useState } from "react"
import { readDataFromServer, readTokenProtectedDataFromServer } from "../fetchRequests"

const useToFetchDataFromServer = (endpoint) => {
    let [data, setData] = useState(null)

    const fetchData = () => {
        fetch(endpoint)
            .then(resp => resp.json())
            .catch(err => console.log("rrequest error!!", err))
            .then(dataset => setData(dataset))
            .catch(err => console.log("response error!!", err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data }
}

const useToFetchSectionSpecificDataForAdmin = (url, appCtx) => {
    const [dataset, setDataset] = useState()

    const handleDataset = (results) => {
        if(results.products) {
            setDataset(results.products)
        } else if(results.orders) {
            setDataset(results.orders)
        } else if(results.users) {
            setDataset(results.users)
        } else if(results.product) {
            setDataset(results.product)
        } else if(results.order) {
            setDataset(results.order)
        } else if(results.user) {
            setDataset(results.user)
        }
    }

    const beginFetching = () => {
        readTokenProtectedDataFromServer(url, handleDataset, appCtx.user.accessToken)
        // readDataFromServer(url, handleDataset)
    }

    useEffect(() => {
        beginFetching()
    }, [url])

    return {dataset}
}

export {
    useToFetchDataFromServer,
    useToFetchSectionSpecificDataForAdmin
}