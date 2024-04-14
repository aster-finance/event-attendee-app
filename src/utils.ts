import _ from "lodash";

export const camelize = (obj: any) =>
  _.transform(obj, (acc: any, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key as string);

    acc[camelKey] = _.isObject(value) ? camelize(value) : value;
  });


export function formatDate(date: string | null): string {
  if (!date) return "";
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day, year] = formattedDate.split("/");
  const monthName = new Date(`${month}/1/${year}`).toLocaleString('default', { month: 'long' });
  return `${monthName} ${day}`;
}