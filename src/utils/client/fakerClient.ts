import { faker } from '@faker-js/faker';
import { Member } from './types';

export const fakeMembers = (count: number): Member[] => {
  const members: Member[] = [];

  for (let i = 0; i < count; i++) {
    members.push({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      points: faker.number.int({ min: 0, max: 9999 }),
      totalPurchases: faker.number.int({ min: 0, max: 999999 }),
      level: faker.helpers.arrayElement(['King', 'Expert', 'Beginner']),
      visits: faker.number.int({ min: 0, max: 99 }),
      lastVisit: faker.date.recent({ days: 365 }),
    });
  }

  return members;
};
