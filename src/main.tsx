import ReactDOM from 'react-dom/client'
import App from './app';
import { ApolloProvider } from '@apollo/client';
import { client } from './shared/api/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
