import { IUser } from '@/api';
import ESortOptionsUsers from '@/utils/enums/sortOptionsUsers';
import { useState } from 'react';

const useSortUsers = (users: IUser[]) => {
  const [sortOption, setSortOption] = useState<ESortOptionsUsers | null>(null);

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSortOption(value as ESortOptionsUsers);
  };

  const sortedUsers = () => {
    if (!users) return [];

    const usersCopy = [...users];

    switch (sortOption) {
      case ESortOptionsUsers.NameAToZ:
        return usersCopy.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
      case ESortOptionsUsers.NameZToA:
        return usersCopy.sort((a, b) => `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`));
      case ESortOptionsUsers.RoleAToZ:
        return usersCopy.sort((a, b) => a.roles[0]?.value.localeCompare(b.roles[0]?.value));
      case ESortOptionsUsers.RoleZToA:
        return usersCopy.sort((a, b) => b.roles[0]?.value.localeCompare(a.roles[0]?.value));
      case ESortOptionsUsers.EmailAToZ:
        return usersCopy.sort((a, b) => a.email.localeCompare(b.email));
      case ESortOptionsUsers.EmailZToA:
        return usersCopy.sort((a, b) => b.email.localeCompare(a.email));
      case ESortOptionsUsers.BannedYesToNo:
        return usersCopy.sort((a, b) => (a.bannedId ? -1 : 1));
      case ESortOptionsUsers.BannedNoToYes:
        return usersCopy.sort((a, b) => (b.bannedId ? -1 : 1));
      default:
        return usersCopy;
    }
  };

  return {
    sortOption,
    handleSortChange,
    sortedUsers,
  };
};

export default useSortUsers;
