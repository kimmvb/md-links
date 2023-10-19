const resolvingPath = require("../paths");

describe("resolvingPath", () => {
  it("resolves with links for a valid markdown file", () => {
    return expect(resolvingPath('C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md')).resolves.toStrictEqual([
        {
          text: 'Enlace a Google',
          url: 'https://www.google.com',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        },
        {
          text: 'Enlace a OpenAI',
          url: 'https://www.openai.com',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        },
        {
          text: 'Enlace a GitHub',
          url: 'https://www.github.com',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        }
      ]);
  });
  it("resolves with links for a valid markdown file and transfoms to an absolute path", () => {
    return expect(resolvingPath('prueba/prueba1.md')).resolves.toStrictEqual([
        {
          text: 'Enlace a Google',
          url: 'https://www.google.com',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        },
        {
          text: 'Enlace a OpenAI',
          url: 'https://www.openai.com',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        },
        {
          text: 'Enlace a GitHub',
          url: 'https://www.github.com',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        }
      ]);
  });
  it("rejects with an error for an invalid path", () => {
    return expect(resolvingPath('prueba/prueba1.m')).rejects.toThrowError(/El archivo no existe o la ruta prueba\/prueba1.m es incorrecta ❎/);
  });
  it("rejects with an error for an invalid file (not Markdown)", () => {
    return expect(resolvingPath('index.js')).rejects.toThrowError(/¡El archivo no es markdown! ❎/);
  });
  it.only("rejects with an error for an empty file", () => {
    const findLinks = jest.fn();
    findLinks.mockRejectedValue();
    return expect(resolvingPath('prueba/vacio.md')).rejects.toMatch(/No se encontraron enlaces en el archivo: ❎/);
  });  
});
