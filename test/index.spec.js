const mdLinks = require("../index");

describe("mdLinks", () => {
  it("resolves with links for a valid markdown file", () => {
    return expect(
        mdLinks("C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md")
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
        text: 'Enlace a Ejemplo',
        url: 'https://www.example.com/nonexistent',
        file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
      }
    ]);
  });
  it("resolves with links for a valid markdown file and the links are validated", () => {
    return expect(
        mdLinks("C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md", "true")
    ).resolves.toStrictEqual([
      {
        text: "Enlace a Google",
        url: "https://www.google.com",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
        status: 200,
        statusText: "OK",
      },
      {
        text: "Enlace a OpenAI",
        url: "https://www.openai.com",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
        status: 200,
        statusText: "OK",
      },
      {
        text: "Enlace a GitHub",
        url: "https://www.github.com",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
        status: 200,
        statusText: "OK",
      },
      {
        text: "Enlace a Ejemplo",
        url: "https://www.example.com/nonexistent",
        file: "C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md",
        status: 404,
        statusText: "Not Found",
      },
    ]);
  });
  it("rejects with an error for an invalid path", () => {
    return expect(() => mdLinks('prueba/vacio.m')).rejects.toThrow(Error);
  });
});
