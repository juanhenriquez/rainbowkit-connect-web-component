import * as styles from "@rainbow-me/rainbowkit/styles.css";

import App from "./App";
import { createWebComponent } from "./helpers/createWebComponent";

console.log({ styles });

createWebComponent(App, {
  tagName: "finely-connect-wallet",
});
