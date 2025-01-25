import '../global.css';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter/inter-v18-latin-regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter/inter-v18-latin-500.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter/inter-v18-latin-700.ttf'),
    'Playfair-Regular': require('../assets/fonts/Playfair/playfair-display-v37-latin-regular.ttf'),
    'Playfair-Medium': require('../assets/fonts/Playfair/playfair-display-v37-latin-500.ttf'),
    'Playfair-Bold': require('../assets/fonts/Playfair/playfair-display-v37-latin-700.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded || error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="profile/index" options={{ headerShown: false }} />
      <Stack.Screen name="profile/recipes" options={{ headerShown: false }} />
      <Stack.Screen name="profile/createRecipe" options={{ headerShown: false }} />
      <Stack.Screen name="profile/editRecipe/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="profile/favorites" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="categories/index" options={{ headerShown: false }} />
      <Stack.Screen name="recipes/index" options={{ headerShown: false }} />
      <Stack.Screen name="categories/[category]" options={{ headerShown: false }} />
      <Stack.Screen name="recipes/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="_404" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
