import cafe from "../image/cafe.png";
import park from "../image/leaf.png";
import restaurant from "../image/restaurant.png";
import hair from "../image/hair.png";
import convenience from "../image/convenience.png";
import bar from "../image/bar.png";
import library from "../image/library.png";
import bakery from "../image/bakery.png";

export function getTargetImage(targetID) {
  switch (targetID) {
    case 1:
      return cafe;
    case 2:
      return restaurant;
    case 3:
      return bakery;
    case 4:
      return convenience;
    case 5:
      return hair;
    case 6:
      return park;
    case 7:
      return library;
    case 8:
      return bar;
  }
}
