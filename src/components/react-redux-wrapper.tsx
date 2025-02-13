import store from "@/state/store";
import { Provider } from "react-redux";

const ReactReduxWrapper = ({ children }: React.PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReactReduxWrapper;
