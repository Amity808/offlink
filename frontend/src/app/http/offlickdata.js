import api from "./axiosfetch"
import { toast } from "react-toastify"


export const userOrder = async (orderData, token) => {
    try {
        const newOrder = api.post("/api/v1/new-transaction", orderData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
        })

        const result = await newOrder;
        console.log(result)
        toast.success("Order Successfully placed. Waiting for Trader")
    } catch (err) {
        console.log(err.message);
    }
}


export const nairapricefeed = async () => {
    try {
        const fetchcurrency = api.get(`https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=ngn`)
        const res = await fetchcurrency
        console.log(res.data.usd);
        return res
    } catch (err) {
        console.log("Naira price fee ", err)
    }
}