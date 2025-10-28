import '@npm-questionpro/wick-ui-icon/dist/wu-icon.css'
import '@npm-questionpro/wick-ui-lib/dist/style.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App.tsx'
import {IS_MOCK_ENV} from './constants/appConstants.ts'
import './index.css'
import {AppProviders} from './providers/AppProviders.tsx'

async function enableMocking(): Promise<void> {
  if (!IS_MOCK_ENV) {
    return
  }

  const {mswDevServer} = await import('./msw/mswDevServer.ts')
  const serviceWorkerUrl = `${import.meta.env.BASE_URL}mockServiceWorker.js`
  console.log(serviceWorkerUrl)

  await mswDevServer.start({
    serviceWorker: {
      url: serviceWorkerUrl,
      options: {
        scope: '',
      },
    },
  })
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AppProviders>
          <App />
        </AppProviders>
      </StrictMode>,
    )
  })
  .catch(err => console.error(err))
