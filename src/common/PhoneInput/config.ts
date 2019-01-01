function mkConfig(countryCode, commonPrefix, maxLength) {
  return { countryCode, commonPrefix, maxLength };
}

const configs = {
  mx: mkConfig("52", "01", 10),
  my: mkConfig("60", "01", 9),
  za: mkConfig("27", "0", 9),
  ae: mkConfig("971", "05", 10)
};

export default configs[process.env.country || "xx"];
