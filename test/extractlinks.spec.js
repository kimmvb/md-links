const { readPath, findLinks } = require("../extractlinks");

describe("extractlinks", () => {
  it("resolves with links for a valid markdown file", () => {
    return expect(
      findLinks("C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md")
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
    ]);
  });
  it("resolves with the data from a valid markdown file", () => {
    return expect(
      readPath("C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md")
    ).resolves.toContain("Ejemplo de Archivo Markdown");
  });
  it("rejects with an error for an empty file", () => {
    return expect(findLinks('prueba/vacio.md')).rejects.toThrow(Error);
  });
  it("rejects with an error while reading the file (readPath)", () => {
    return expect(readPath('prueba/vacio.m')).rejects.toThrowError("ENOENT: no such file or directory, open 'C:\\Users\\Usuario\\md-links\\prueba\\vacio.m'");
  });
  it("catch an error while treating a promise)", () => {
    return expect(findLinks('prueba/vacio.m')).rejects.toThrowError("ENOENT: no such file or directory, open 'C:\\Users\\Usuario\\md-links\\prueba\\vacio.m'");
  });
});
