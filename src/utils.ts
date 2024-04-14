
export function formatDate(date: string | null): string {
  if (!date) return "";
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day, year] = formattedDate.split("/");
  const monthName = new Date(`${month}/1/${year}`).toLocaleString('default', { month: 'long' });
  return `${monthName} ${day}`;
}

export const defaultAvatar = "https://cdn.lu.ma/avatars-default/avatar_21.png";