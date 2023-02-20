export function remainingTime(waitTime, elapsedTime) {
  let remain = waitTime - elapsedTime;
  if (remain < 0) {
    remain = 0;
  }
  return remain;
}

export function elapsedTime(elapsed, runningSince) {
  let totalElaped = elapsed;
  if (runningSince > 0) {
    totalElaped += Date.now() - runningSince;
  }
  return totalElaped;
}

export function millisecondsToHuman(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / 1000 / 60) % 60);
  let hours = Math.floor((ms / 1000 / 60 / 60) % 24);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(":");
  return humanized;
}

export function stopWatchTimer(ms) {
  let milliseconds = Math.floor((ms / 10) % 100);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / 1000 / 60) % 60);

  const humanized = [
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
    pad(milliseconds.toString(), 2),
  ].join(":");
  return humanized;
}

export function date(d) {
  const dateString = [
    pad(d.getDate().toString(), 2),
    pad(d.getMonth().toString(), 2),
    d.getFullYear(),
  ].join("-");
  return dateString;
}

export function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}
