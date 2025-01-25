import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import { SignUpForm } from '@/components/forms';
import { EUrls } from '@/utils';
import { router } from 'expo-router';
import { AuthRedirectLink } from '@/components/elements';

const SignUpPage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Registration',
    });
  }, [navigation]);

  const goToLogin = () => {
    router.push(EUrls.LOGIN);
  };

  return (
    <SafeAreaView className="bg-whiteDark h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View className="my-16 px-4">
            <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">Sign Up</Text>
            <SignUpForm />
            <View className="mt-4">
              <AuthRedirectLink message="Already have an account?" linkText="Login" onPress={goToLogin} />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default SignUpPage;
