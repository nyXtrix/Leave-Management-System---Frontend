import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes/AppRoutes';
import { Toaster } from '@/components/ui/sonner';

import { LoaderProvider } from '@/contexts/LoaderContext';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoaderProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </LoaderProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
