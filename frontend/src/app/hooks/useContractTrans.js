import { useContractWrite, usePrepareContractWrite } from "wagmi";
import ERC20 from '../../app/contract/erc20InstacnceAbi.json'
import offlick from "../../app/contract/offlink.json"
import { BigNumber } from "ethers";

export const useContractTrans = (amount) => {
    const gasLimit = BigNumber.from(1000000)

    const { config } = usePrepareContractWrite({
        address: ERC20.addres,
        abi: ERC20.abi,
        functionName: 'approve',
        args: [offlick.address, amount],
        overrides: {
            gasLimit
        },
        
        onError: (err) => {
            console.log({ err });
        }
    })

    const { data, isSuccess, writeAsync, write, error,  isLoading} = useContractWrite(config)
    return { data, isSuccess, writeAsync, write, isLoading}
}