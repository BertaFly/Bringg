interface IFullNameArgs {
  firstName: string;
  lastName: string;
}

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getFullName = ({ firstName, lastName }: IFullNameArgs) => {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

export const formatDate = (rawDate: string) => {
  const dateObj = new Date(rawDate);
  const makeFullFormat = (value: number) => (value < 10 ? `0${value}` : value);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return `${makeFullFormat(day)}-${makeFullFormat(month)}-${year}`;
};
