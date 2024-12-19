export function secondsToMmSs(seconds: number) {
  seconds = Math.floor(seconds);
  if (isNaN(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
