import { useContractRead } from "wagmi";
import offlick from "../../app/contract/offlink.json"
export const useContractCall = (functionName, args, watch) => {

    const resp = useContractRead({

        address: offlick.address,
        abi: offlick.abi,
        functionName: functionName,
        args,
        watch,
        onError: (err) => {
            console.log({ err })
        }

    })
    
    return resp
}