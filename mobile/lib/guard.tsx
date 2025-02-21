import React, { useEffect , useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { checkAuth } from "../redux/slices/authSlice";
import { router,useRouter } from "expo-router";


const Guard = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { token } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {

        if (!token) {
          router.push("/auth");
        }
      
    }, [token]);
  

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  
    return children;
  };

  export default Guard