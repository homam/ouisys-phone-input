function mkConfig(countryCode, commonPrefix, maxLength) {
  return { countryCode, commonPrefix, maxLength };
}

const configs = {
  mx: mkConfig("52", "01", 10),
  my: mkConfig("60", "01", 9),
  za: mkConfig("27", "0", 9),
  ae: mkConfig("971", "05", 10),
  gr: mkConfig("30", "69", 9),
  ee: mkConfig("372", "", 10),
  xx: mkConfig("", "", 10)
};

export default (countryCode : string) => configs[countryCode] || configs.xx;
