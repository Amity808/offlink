"use client";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import flag from "../../../../public/img/flag.svg";
import { identiconTemplate } from "@/app/components/helper";
import { ethers } from "ethers";
import { useContractCall } from "@/app/hooks/useContractRead";
import { useContractSendWrite } from "@/app/hooks/useContractWrite";
import { useAccount } from "wagmi";
import { useContractTrans } from "@/app/hooks/useContractTrans";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";

const OrderItem = ({ id }) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [orderItem, setOrderItem] = useState(null);
  const { data: _orders } = useContractCall("_orders", [id], true);

  const { writeAsync: releaseFunds } = useContractSendWrite("releaseFunds", [
    Number(id),
  ]);
  const { writeAsync: cancelOrder } = useContractSendWrite("cancelOrder", [
    Number(id),
  ]);
  const { writeAsync: approve } = useContractTrans(
    orderItem?.amountInToken.toString() || "1"
  );

  const handleAccept = async () => {
    if (!approve) throw "Failed to approve spending";

    const approveTx = await approve();
    await approveTx;

    if (!releaseFunds) throw "Failed to accept order";
    const takeOrder = await releaseFunds();
    await takeOrder;
  };

  const handleCancelOrder = async () => {
    if (!cancelOrder) throw "Failed to cancel order";
    const cancelTx = await cancelOrder();
  };

  const ordercancle = async () => {
    try {
      if (!address && openConnectModal) {
        openConnectModal();
        return;
      }
      await toast.promise(handleCancelOrder(), {
        pending: "Waiting for confirmation",
        success: "Successfully cancel",
        error: "Kindly right again later",
      });
    } catch (err) {
      console.log(err?.message);
      toast.error(err?.message);
    }
  };

  const releaseFundsQuece = async () => {
    try {
      if (!address && openConnectModal) {
        openConnectModal();
        return;
      }
      await toast.promise(handleAccept(), {
        pending: "Prcessing payment for trader",
        success: "Payment successful",
        error: "Kindly right again later",
      });
    } catch (err) {
      console.log(err?.message);
      toast.error(err?.message);
    }
  };

  const getOrdersItem = useCallback(() => {
    if (!_orders) return null;
    setOrderItem({
      txStatus: _orders[0],
      nonce: Number(_orders[1]),
      seller: _orders[2],
      buyer: _orders[3],
      token: _orders[4],
      currency: _orders[5],
      amountInToken: Number(_orders[6]),
      amountInCurrency: Number(_orders[7]),
    });
  }, [_orders]);

  useEffect(() => {
    getOrdersItem();
  }, [getOrdersItem]);

  if (!orderItem) return null;

  const amountTOken = ethers.utils.formatEther(
    orderItem?.amountInToken.toString()
  );

  //   accept order

  return (
    <div className="">
      {address == orderItem?.seller ? (
        <>
          <div className=" w-[402px] h-[280px] bg-[#D9D9D9] rounded-lg flex flex-col max-sm:w-[350px]">
            <div className=" flex justify-between px-4 items-center mt-[15px]">
              {/* <Image src={ladyjpng} width={24} height={24} className=' rounded-full w-[60px] h-[60px]' /> */}
              {identiconTemplate(orderItem.seller, 12)}

              {orderItem.txStatus == 0 ? (
                <p>Pending</p>
              ) : orderItem.txStatus == 1 ? (
                <button
                  className=" rounded-lg p-2 border-black border"
                  onClick={releaseFundsQuece}
                >
                  Approved
                </button>
              ) : orderItem.txStatus == 2 ? (
                <p>Order Cancel</p>
              ) : (
                <p>Order Completed</p>
              )}
            </div>
            <span className=" mb-[12px] mt-[22px] ml-[25px] text-lg font-semibold">
              <p>Address</p>
            </span>
            <div className=" flex ml-[28px] gap-4">
              <p>
                wants to swap {amountTOken} cUSD for{" "}
                {orderItem.amountInCurrency}
              </p>
              <span className=" flex flex-row gap-2 mr-5 justify-center items-start">
                <p>NIG</p>
                <Image src={flag} width={24} alt="flag" height={24} className="" />
              </span>
            </div>
            <div className=" ml-[28px] text-base font-medium  mt-2">
              <p className=" text-sm">Do you want to cancel your order?</p>
              <span className=" flex justify-end mr-2">
                {orderItem?.txStatus == 1 ? <button
                  className=" rounded-lg p-2 border-black border "
                  onClick={ordercancle}
                >
                  Cancel
                </button> : <button
                  className=" rounded-lg p-2 border-black border "
                >
                  Wait
                </button> }
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderItem;
