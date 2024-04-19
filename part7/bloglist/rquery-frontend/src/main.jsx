import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationContextProvider from './contexts/notificationContext';
import UserContextProvider from './contexts/userContext';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserContextProvider>
		<QueryClientProvider client={queryClient}>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</QueryClientProvider>
	</UserContextProvider>
);
