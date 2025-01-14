import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import AppContainer from "@/containers";
import GlobalStyles from "@/styles/GlobalStyles";
import ErrorFallback from "@/components/ErrorFallback";

function App() {
    return (
        <StrictMode>
            <Provider store={store}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <GlobalStyles />
                    <BrowserRouter>
                        <AppContainer />
                    </BrowserRouter>
                </ErrorBoundary>
            </Provider>
        </StrictMode>
    );
}

export default App;
