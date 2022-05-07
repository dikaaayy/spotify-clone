export const dateLogic = (date) => {
  const substr = date.substring(0, 10);
  const current = new Date().toISOString().slice(0, 10);

  const res = Math.abs(current - substr);
  return substr;
};

export const durationLogic = (ms) => {
  const min = Math.floor(ms / 60000);
  const sec = ((ms % 60000) / 1000).toFixed(0);

  return min + ":" + (sec < 10 ? "0" : "") + sec;
};

export function truncate(str, len) {
  return str?.length > len ? str.substr(0, len - 1) + "..." : str;
}

export const likeLogic = (n) => {
  if (n === 0) {
    return;
  }
  if (n === 1) {
    return "1 like";
  }
  // const like = n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return `${n} likes`;
};

export const playlistNameLogic = (playlist) => {};
