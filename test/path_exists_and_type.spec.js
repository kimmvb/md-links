const pathExistsAndType = require("../src/path_exists_and_type");

describe("path_exists_and_type", () => {
  it("resolves with links if the path is a file", () => {
    return expect(
      pathExistsAndType("C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md")
    ).resolves.toStrictEqual([
      {
        text: "Enlace a Google",
        url: "https://www.google.com",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
      },
      {
        text: "Enlace a OpenAI",
        url: "https://www.openai.com",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
      },
      {
        text: "Enlace a GitHub",
        url: "https://www.github.com",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
      },
      {
        text: "Enlace a Ejemplo",
        url: "https://www.example.com/nonexistent",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
      },
    ]);
  });
  it("resolves with links if the path is a directory", () => {
    return expect(
      pathExistsAndType("C:\\Users\\Usuario\\md-links\\prueba_test")
    ).resolves.toStrictEqual([
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
    ]);
  });
  it("rejects with an error if a path does not exist", () => {
    return expect(
      pathExistsAndType("C:\\Users\\Usuario\\md-links\\empty_direc")
    ).rejects.toThrow(Error);
  });
  it("rejects with an error if a path is neither from a file or a directory", () => {
    return expect(
      pathExistsAndType(".editorconfig")
    ).rejects.toThrow(Error);
  });
});
