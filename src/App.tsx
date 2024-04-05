import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "pages/auth/auth";
import P2P from "pages/p2p/p2p";
import Topbar from "components/app/topbar";
import Sidebar from "components/app/sidebar";
import Deposit from "pages/deposit/deposit";
import Settings from "pages/settings/settings";
import Withdrawal from "pages/withdrawal/withdrawal";

function App() {
  return (
    <>
      <main>
        <Suspense fallback=".">
          <Sidebar />
        </Suspense>

        <div className="page-container">
          <div className="page-container__content">
            <Topbar />

            <Routes>
              <Route path="/" element={<P2P />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/withdrawal" element={<Withdrawal />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
