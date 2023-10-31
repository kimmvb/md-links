const checkPath = require("../src/check_path");

describe("checkPath", () => {
  it("resolves with links for a valid markdown file", () => {
    return expect(checkPath('C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md')).resolves.toStrictEqual([
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
        },
        {
          text: 'Enlace a Ejemplo',
          url: 'https://www.example.com/nonexistent',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        }
      ]);
  });
  it("resolves with links for a valid markdown file and transfoms to an absolute path", () => {
    return expect(checkPath('prueba/prueba1.md')).resolves.toStrictEqual([
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
        },
        {
          text: 'Enlace a Ejemplo',
          url: 'https://www.example.com/nonexistent',
          file: 'C:\\Users\\Usuario\\md-links\\prueba\\prueba1.md'
        }
      ]);
  });
  it("rejects with an error for an invalid file (not Markdown)", () => {
    return expect(checkPath('index.js')).rejects.toThrowError(/The file 'C:\\Users\\Usuario\\md-links\\index.js' is not markdown! ❎/);
  });
  it("rejects with an error for an empty file", () => {
    return expect(checkPath('prueba/vacio.md')).rejects.toThrowError("There was not a single link inside the file 'C:\\Users\\Usuario\\md-links\\prueba\\vacio.md' ❎");
  });  
});
