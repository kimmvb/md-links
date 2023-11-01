const {
  extractFiles,
  completePathsExtractLinks,
} = require("../src/extract_files");

describe("extractlinks", () => {
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
});
