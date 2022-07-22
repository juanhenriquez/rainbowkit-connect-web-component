import { useContext } from "react";
import PropTypes from "prop-types";
import { WagmiConfig } from "wagmi";
import { ConnectModal, RainbowKitProvider } from "@juanhenriquez/rainbowkit";

import { wagmiClient, chains } from "./lib/rainbow";
import { EventContext } from "./context/EventContext";

function App({ container, open }: { container: HTMLElement; open: boolean }) {
  const dispatch = useContext(EventContext);

  function onCloseModal() {
    dispatch(new CustomEvent("close"));
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectModal
          open={open}
          container={container}
          onClose={onCloseModal}
        />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

App.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default App;
