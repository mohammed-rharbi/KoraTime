import '../global.css';
import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import Guard from '~/lib/guard';
import Toast from 'react-native-toast-message';
import AuthProtectedRoute from '~/components/AuthProtection';


export const unstable_settings = {

	initialRouteName: "(tabs)",
};

export default function RootLayout() {
  	

  	return (
    	
		
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false  }} />
			<Stack.Screen name="modal" options={{ presentation: "modal"}} />
			<Toast/>
		</Stack>
		
  	);
}