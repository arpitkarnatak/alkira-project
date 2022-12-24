import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './components/Main';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Main />
    </QueryClientProvider >
  );
}

export default App;
