const findLinks = require("../extractlinks");

describe("findLinks", () => {
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
  /* it.only("resolves with links for a valid markdown file", () => {
    return findLinks("C:/Users/Usuario/md-links/prueba/vacio.md")
    .then(() => {
      // La promesa se resolvió cuando no debería
      fail("La promesa debería haber sido rechazada");
    })
    .catch(error => {
      expect(error.message).toBe("No se encontraron enlaces en el archivo: C:/Users/Usuario/md-links/prueba/vacio.md ❎");
    });
    /*
    return expect(
      findLinks("C:/Users/Usuario/md-links/prueba/vacio.md")
    ).rejects.toThrowError(
      /No se encontraron enlaces en el archivo: C:\\Users\\Usuario\\md-links\\prueba\\vacio.md ❎/
    ); 
  }); */
});
