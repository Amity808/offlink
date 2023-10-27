import { useContractWrite, usePrepareContractWrite } from "wagmi";
import offlick from "../../app/contract/offlink.json"
import { BigNumber } from "ethers";

export const useContractSendWrite = (functionName, args) => {
    const gasLimit = BigNumber.from(1000000)
    const { config } = usePrepareContractWrite({
        address: offlick.address,
        abi: offlick.abi,
        functionName: functionName,
        args,
        overrides: {
            gasLimit
        },
        onError: (err) => {
            console.log(err);
            
        }
    })
    const { data, isSuccess, write, writeAsync, error, isLoading} = useContractWrite(config)

    return { data, isSuccess, write, writeAsync, isLoading}

}