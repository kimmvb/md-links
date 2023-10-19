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
    ]);
  });
  it("rejects with an error for an invalid path", () => {
    const resolvingPath = jest.fn();
    resolvingPath.mockImplementation(() => {
        throw new Error('El archivo no existe o la ruta prueba\/prueba1.m es incorrecta ❎');
      });
    return expect(mdLinks('prueba/prueba1.m')).rejects.toThrow('El archivo no existe o la ruta prueba/prueba1.m es incorrecta ❎');
  });
});
