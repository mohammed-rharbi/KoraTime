import '../global.css';
import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '~/redux/store';
import Guard from '~/lib/guard';


export const unstable_settings = {

	initialRouteName: "(tabs)",
};

export default function RootLayout() {
  	

  	return (
    	
		<Provider store={store}>
		{/* <Guard> */}
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false  }} />
			<Stack.Screen name="modal" options={{ presentation: "modal" }} />
		</Stack>
		{/* </Guard> */}
		</Provider>
		
  	);
}