"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets, lightTheme
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { celo, celoAlfajores, polygonMumbai } from "wagmi/chains";
import { CeloWallets } from "@celo/rainbowkit-celo";
const inter = Inter({ subsets: ["latin"] });



const projectId = "32f49eea0d51f8b842d2e740d6a5907d";

const { chains, publicClient } = configureChains(
  [celoAlfajores, celo],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "Offlink",
  projectId: projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Recommended with Celo",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      omniWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const dappInfo = {
  appName: "Offlink",
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#EFAE07",
              accentColorForeground: "white",
              borderRadius: "small",
              fontStack: "system",
            })}
            chains={chains}
            appInfo={dappInfo}
          >
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
        
      </body>
    </html>
  );
}
