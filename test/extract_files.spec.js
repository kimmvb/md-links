const {
  extractFiles,
  completePathsExtractLinks,
} = require("../src/extract_files");

describe("extractlinks", () => {
  beforeAll(() => {
    // Create a spy on console (console.log in this case) and provide some mocked implementation
    // In mocking global objects it's usually better than simple `jest.fn()`
    // because you can `unmock` it in clean way doing `mockRestore`
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    // Restore mock after all tests are done, so it won't affect other test suites
    console.error.mockRestore();
  });
  afterEach(() => {
    // Clear mock (all calls etc) after each test.
    // It's needed when you're using console somewhere in the tests so you have clean mock each time
    console.error.mockClear();
  });
  it("resolves with the files' names from a path directory", () => {
    return expect(
      extractFiles("C:\\Users\\Usuario\\md-links\\prueba")
    ).resolves.toStrictEqual([
      "prueba1.md",
      "prueba2.md",
      "pruebajs.js",
      "vacio.md",
    ]);
  });
  it("rejects with an error for an empty directory", () => {
    return expect(
      extractFiles("C:\\Users\\Usuario\\md-links\\empty_directory")
    ).rejects.toThrow(Error);
  });
  it("resolves with the files' links from a directory", () => {
    return expect(
      completePathsExtractLinks("C:\\Users\\Usuario\\md-links\\prueba_test")
    ).resolves.toStrictEqual([
      [
        {
          file: "C:\\Users\\Usuario\\md-links\\prueba_test\\pruebatest1.md",
          text: "Enlace a Google",
          url: "https://www.google.com",
        },
        {
          file: "C:\\Users\\Usuario\\md-links\\prueba_test\\pruebatest1.md",
          text: "Enlace a Ejemplo",
          url: "https://www.example.com/nonexistent",
        },
      ],
      [
        {
          file: "C:\\Users\\Usuario\\md-links\\prueba_test\\pruebatest2.md",
          text: "Enlace a Google",
          url: "https://www.google.com",
        },
        {
          file: "C:\\Users\\Usuario\\md-links\\prueba_test\\pruebatest2.md",
          text: "Enlace a OpenAI",
          url: "https://www.openai.com",
        },
        {
          file: "C:\\Users\\Usuario\\md-links\\prueba_test\\pruebatest2.md",
          text: "Enlace a Ejemplo",
          url: "https://www.example.com/nonexistent",
        },
      ],
    ]);
  });
  it("rejects with an error for an empty directory (completePathsExtractLinks)", () => {
    return expect(
      completePathsExtractLinks("C:\\Users\\Usuario\\md-links\\empty_directory")
    ).rejects.toThrow(Error);
  });
  /*it("rejects with an error for an unvalid file in a directory", () => {
    return expect(
      completePathsExtractLinks(
        "C:\\Users\\Usuario\\md-links\\prueba_test_invalid"
      )
    ).resolves.toContain([
         Error(
          "\nThe file 'C:\\Users\\Usuario\\md-links\\prueba_test_invalid\\prueba_test_invalid.js' is not markdown! ❎\n"
        ),
    ]);
  });*/
  /*it("rejects with an error for an unvalid file in a directory", () => {
    return expect(
      completePathsExtractLinks(
        "C:\\Users\\Usuario\\md-links\\prueba_test_invalid"
      )
    ).resolves.toMatchObject([
        Error("\nThe file 'C:\\Users\\Usuario\\md-links\\prueba_test_invalid\\prueba_test_invalid.js' is not markdown! ❎\n"),
    ]);
  });  */
});
