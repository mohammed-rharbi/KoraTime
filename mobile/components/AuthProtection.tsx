import useAuthStore from '~/store/authStore';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect } from 'expo-router';



export default function AuthProtectedRoute({ children }: { children: JSX.Element }) {

  const { user, isLoading } = useAuthStore();

  const router = useRouter()

if (isLoading) {
    return (
      <LinearGradient
        colors={['#0A0F1E', '#0F172A']}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#2DD4BF" />
      </LinearGradient>
    );
  }
  
  if (!user) {
    return <Redirect href="/" />;  }

  return children;
}