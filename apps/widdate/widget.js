(() => {
  var width = 130;

  function draw() {
    var locale = require("locale");

    g.reset();
    g.setFontAlign(0, 0); // center fonts

    // Rectangle to check width fits text.
    // g.drawRect(this.x, this.y, this.x+width-1, this.y+23);

    var date = new Date();
    var text =
      locale.dow(date, 1) + " " + date.getDate() + " " + locale.month(date, 1);

    g.setFont("6x8", 2);
    g.drawString(text, this.x + width / 2, this.y + 12);
  }

  WIDGETS.date = {
    area: "tl", // top left
    width: width,
    draw: draw,
  };

  var batteryInterval;
  Bangle.on("lcdPower", function (on) {
    if (on) {
      WIDGETS.date.draw();
      // refresh once a minute if LCD on
      if (!batteryInterval)
        batteryInterval = setInterval(() => WIDGETS.date.draw(), 60000);
    } else {
      if (batteryInterval) {
        clearInterval(batteryInterval);
        batteryInterval = undefined;
      }
    }
  });
})();
