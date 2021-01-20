import React from 'react';
import GlobalStyle from './styles/global';
import SignUp from './pages/SignUp';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider> 
      <SignUp />
    </AuthProvider>
    <GlobalStyle />  
  </>
)

export default App;
