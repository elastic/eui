import { Comparators } from '../../../../src/services/sort';
import { Random } from '../../../../src/services/random';
import { times } from '../../../../src/services/utils';

const random = new Random();

const createCountries = () => [
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'US', name: 'United States', flag: '🇺🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
];

const createUsers = (countries) => {
  return times(20, (index) => {
    return {
      id: index,
      firstName: random.oneOf('Martijn', 'Elissa', 'Clinton', 'Igor', 'Karl', 'Drew', 'Honza', 'Rashid', 'Jordan'),
      lastName: random.oneOf('van Groningen', 'Weve', 'Gormley', 'Motov', 'Minarik', 'Raines', 'Král', 'Khan', 'Sissel'),
      github: random.oneOf('martijnvg', 'elissaw', 'clintongormley', 'imotov', 'karmi', 'drewr', 'HonzaKral', 'rashidkpc', 'jordansissel'),
      dateOfBirth: random.date({ min: new Date(1971, 0, 0), max: new Date(1990, 0, 0) }),
      nationality: random.oneOf(...countries.map(country => country.code)),
      online: random.boolean()
    };
  });
};

export const createDataStore = () => {
  const countries = createCountries();
  const users = createUsers(countries);
  return {
    countries,
    users,

    findUsers: (pageIndex, pageSize, sort) => {
      let list = users;
      if (sort) {
        list = users.sort(Comparators.property(sort.field, Comparators.default(sort.direction)));
      }
      if (!pageIndex && !pageSize) {
        return {
          index: 0,
          size: list.length,
          items: list,
          totalRecordCount: list.length
        };
      }
      const from = pageIndex * pageSize;
      const items = list.slice(from, Math.min(from + pageSize, list.length));
      return {
        index: pageIndex,
        size: pageSize,
        items,
        totalCount: list.length
      };
    },

    deleteUsers: (...ids) => {
      ids.forEach(id => {
        const index = users.findIndex(user => user.id === id);
        if (index >= 0) {
          users.splice(index, 1);
        }
      });
    },

    cloneUser: (id) => {
      const index = users.findIndex(user => user.id === id);
      if (index >= 0) {
        const user = users[index];
        users.splice(index, 0, { ...user, id: users.length });
      }
    },

    getCountry: (code) => countries.find(country => country.code === code)
  };
};
