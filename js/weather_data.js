function getWeatherIcon() {
  const weatherImages = [
    {
      url: "../images/broken-clouds.png",
      ids: [803, 804],
    },
    {
      url: "../images/clear-sky.png",
      ids: [800],
    },
    {
      url: "../images/few-clouds.png",
      ids: [801],
    },
    {
      url: "../images/mist.png",
      ids: [701, 711, 721, 731, 741, 751, 761, 771, 781],
    },
    {
      url: "../images/rain.png",
      ids: [501, 502, 503, 504],
    },
    {
      url: "../images/scattered-clouds.png",
      ids: [802],
    },
    {
      url: "../images/shower-rain.png",
      ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
    },
    {
      url: "../images/snow.png",
      ids: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622, 6],
    },
    {
      url: "../images/thunderstom.png",
      ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    },
  ];
  return weatherImages;
}
export default getWeatherIcon;
