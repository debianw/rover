const axios = require("axios");
const { fetchLastImage, fetchImageByIndex, roverIterator } = require("./rover");
const config = require("./config");

jest.mock("axios");

describe("Fetch Latest Image", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --
  test("should fetch latest image", async () => {
    const mockResponse = {
      metadata: {
        id: 1,
        sol: 2,
        img_src: "image-url",
      },
      images: {
        ascii: "ascii-value",
        base64: "base64-value",
      },
    };

    axios.get.mockResolvedValue({ data: mockResponse });

    const lastImage = await fetchLastImage();
    expect(lastImage).toEqual(mockResponse);
    expect(axios.get.mock.calls[0][0]).toBe(`${config.api}/latest`);
  });

  // --
  test("should handle exception, returns null", async () => {
    axios.get.mockRejectedValue(new Error("Network error!"));

    const lastImage = await fetchLastImage();
    expect(lastImage).toEqual(null);
    expect(axios.get.mock.calls[0][0]).toBe(`${config.api}/latest`);
  });
});

describe("Fetch Image by Index", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // --
  test("should fetch an image by index", async () => {
    const mockResponse = {
      metadata: {
        id: 11,
        sol: 22,
        img_src: "image-url",
      },
      images: {
        ascii: "ascii-value",
        base64: "base64-value",
      },
    };
    const index = 1;

    axios.get.mockResolvedValue({ data: mockResponse });

    const image = await fetchImageByIndex(index);
    expect(image).toEqual(mockResponse);
    expect(axios.get.mock.calls[0][0]).toBe(`${config.api}/${index}`);
  });

  // --
  test("should handle exception, returns null", async () => {
    axios.get.mockRejectedValue(new Error("Network error!"));
    const index = 2;

    const lastImage = await fetchImageByIndex(index);
    expect(lastImage).toEqual(null);
    expect(axios.get.mock.calls[0][0]).toBe(`${config.api}/${index}`);
  });
});

describe("Rover Images Iterator", () => {
  // --
  test("should iterate through images", async () => {
    const mockResponse1 = {
      metadata: {
        id: 1,
        sol: 2,
        img_src: "image-url",
      },
      images: {
        ascii: "ascii-value",
        base64: "base64-value",
      },
    };

    const mockResponse2 = {
      metadata: {
        id: 2,
        sol: 2,
        img_src: "image-url",
      },
      images: {
        ascii: "ascii-value",
        base64: "base64-value",
      },
    };

    axios.get
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: mockResponse1,
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          data: mockResponse2,
        })
      )
      .mockImplementationOnce(() =>
        Promise.reject(new Error("Image not available"))
      );

    const imageIterator = roverIterator()[Symbol.asyncIterator]();
    const image_1 = await imageIterator.next();
    const image_2 = await imageIterator.next();
    const image_3 = await imageIterator.next();

    expect(image_1.value).toEqual(mockResponse1);
    expect(image_2.value).toEqual(mockResponse2);
    expect(image_3.value).toEqual(null);
    expect(axios.get.mock.calls.length).toBe(3);
  });
});
