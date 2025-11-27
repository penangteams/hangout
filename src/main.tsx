import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from '@/App';
import '@/index.css'
import { CreateEventPage } from "@/pages/CreateEventPage";
import { CreateEventPage1 } from "@/pages/CreateEventPage1";
import { Toaster } from 'react-hot-toast';


async function init() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js', // must match public/mockServiceWorker.js
      },
    });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RecoilRoot>
        {/* <App /> */}
        <CreateEventPage1 />
        <Toaster position="top-right" reverseOrder={false} />
      </RecoilRoot>
    </React.StrictMode>
  );
}

init();
