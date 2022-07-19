import PropTypes from "prop-types";
import { WagmiConfig } from "wagmi";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { wagmiClient, chains } from "./lib/rainbow";

function App({ name }: { name: string }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default App;
