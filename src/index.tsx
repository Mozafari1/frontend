import "./index.scss";
import App from "./root/App";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
