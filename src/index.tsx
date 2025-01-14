import { createRoot } from "react-dom/client";
import App from "./app";
import _ from "lodash";
const depArr = _.cloneDeep([1, 1, 1, 1]);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
