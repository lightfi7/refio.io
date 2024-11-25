export const getRateValue = (value: any, group: string = '') => {
  if (!value || !Array.isArray(value) || !value.length) {
    return 0;
  }

  let total = 0;
  switch (group) {
    case 'easy_to_join':
      value.forEach((v) => { total += Number(v.easy_to_join); });
      break;
    case 'relationship':
      value.forEach((v) => { total += Number(v.relationship); });
      break;
    case 'payment_deadline':
      value.forEach((v) => { total += Number(v.payment_deadline); });
      break;
    default:
      value.forEach((v) => {
        total +=
          (Number(v.easy_to_join) +
            Number(v.relationship) +
            Number(v.payment_deadline)) /
          3;
      });
  }
  const average = total / value.length;

  return parseInt(average.toFixed(2));
};

export function timeDiff(startDate: string | Date, endDate: string | Date) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const diff = end - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days: days,
    hours: hours,
    minutes: minutes,
  };
}

export function getLocalIP() {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .catch((error) => "unknown");
}

// utils/getBrowserInfo.js
export function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  let browserName, osName;

  // Detect Browser
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Microsoft Edge";
  } else if (
    userAgent.indexOf("MSIE") > -1 ||
    userAgent.indexOf("Trident") > -1
  ) {
    browserName = "Internet Explorer";
  } else {
    browserName = "Unknown";
  }

  // Detect OS
  if (userAgent.indexOf("Win") > -1) {
    osName = "Windows";
  } else if (userAgent.indexOf("Mac") > -1) {
    osName = "MacOS";
  } else if (userAgent.indexOf("X11") > -1 || userAgent.indexOf("Linux") > -1) {
    osName = "Linux";
  } else if (userAgent.indexOf("Android") > -1) {
    osName = "Android";
  } else if (userAgent.indexOf("like Mac") > -1) {
    osName = "iOS";
  } else {
    osName = "Unknown";
  }

  return { browserName, osName };
}
