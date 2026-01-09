import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { ScrollToTop } from "./components/ScrollToTop";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__ === '/' ? undefined : __BASE_PATH__}>
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
