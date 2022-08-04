import { DEVICE_DIMENSIONS, DEVICE_PIXELS } from "../constants";
import { calcMm2Pix } from "../utils";

describe("Utils unit tests", () => {
  describe("CalcMm2Pix unit tests", () => {
    it("should match calculated dimensions for X", async () => {
      expect(calcMm2Pix(DEVICE_DIMENSIONS[0], "x")).toEqual(
        parseFloat(DEVICE_PIXELS[0]).toFixed(1)
      );
    });
    it("should match calculated dimensions for Y", async () => {
      expect(calcMm2Pix(DEVICE_DIMENSIONS[1], "y")).toEqual(
        parseFloat(DEVICE_PIXELS[1]).toFixed(1)
      );
    });
  });
});
