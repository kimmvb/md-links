require("axios");
const makeRequest = require("../validate");

const originalLinks = [
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
];

describe("validate", () => {
  it("resolves with links validated", () => {
    return expect(makeRequest(originalLinks)).resolves.toStrictEqual([
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
  it("rejects with an error for an empty file", () => {
    const empty = '';
    return expect(makeRequest(empty)).rejects.toThrow(Error);
  }); 
});
