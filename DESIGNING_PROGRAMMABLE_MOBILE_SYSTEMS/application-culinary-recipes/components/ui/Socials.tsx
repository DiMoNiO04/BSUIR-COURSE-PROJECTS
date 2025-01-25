import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/components/icons';
import socialLinks from '@/data/socials';

interface ISocials {
  color?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

const Socials: React.FC<ISocials> = ({
  facebook = socialLinks.facebook,
  twitter = socialLinks.twitter,
  instagram = socialLinks.instagram,
  color,
}) => {
  const router = useRouter();

  const links = [
    { href: facebook, icon: <FacebookIcon color={color} />, key: 'facebook' },
    { href: twitter, icon: <TwitterIcon color={color} />, key: 'twitter' },
    { href: instagram, icon: <InstagramIcon color={color} />, key: 'instagram' },
  ];

  return (
    <View className="flex-row gap-8">
      {links.map(({ href, icon, key }) =>
        href ? (
          <TouchableOpacity
            key={key}
            onPress={() => router.push(href as RelativePathString)}
            className="w-5 h-5 justify-center items-center"
          >
            {icon}
          </TouchableOpacity>
        ) : null
      )}
    </View>
  );
};

export default Socials;
