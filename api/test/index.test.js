const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de Rutas", () => {
  describe("GET / /rickandmorty/character/:id", () => {
    it("Responde con el status 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });

    it("Si hay error responde con el status 500", async () => {
      await agent.get("/rickandmorty/character/3312").expect(500);
    });
    it('Responde con un objeto con las propiedades: "id", "name", "species", "gender" ,"origin", "status" e "image"', async () => {
      const { body } = await agent.get("/rickandmorty/character/1");

      const atributos = [
        "id",
        "name",
        "species",
        "gender",
        "origin",
        "status",
        "image",
      ];

      atributos.map((atributo) => {
        expect(body).toContain(atributo);
      });
    });

    describe("GET / rickandmorty/login", () => {
      it("Evalua que la informacion sea correcta", async () => {
        const { body } = await agent.get(
          "/rickandmorty/login?email=alvaro@gmail.com&password=12345678"
        );
        expect(body.access).toEqual(true);
      });
    });
    describe("GET / rickandmorty/login", () => {
      it("Evalua que la informacion sea incorrecta", async () => {
        const { body } = await agent.get(
          "/rickandmorty/login?email=alvarado@gmail.com&password=123456123"
        );
        expect(body.access).toEqual(false);
      });
    });
  });
  describe("POST /rinckandmorty/fav", () => {
    const testCharacterA = { id: 1, name: "TEST A" };
    const testCharacterB = { id: 1, name: "TEST B" };

    it("Devuelve un arreglo con la info enviada de A", async () => {
      const { body } = await agent
        .post("/rickandmorty/fav")
        .send(testCharacterA);

      expect(body).toContainEqual(testCharacterA);
    });

    it("Devuelve un arreglo con la info enviada de B", async () => {
      const { body } = await agent
        .post("/rickandmorty/fav")
        .send(testCharacterB);
      expect(body).toContainEqual(testCharacterA);
      expect(body).toContainEqual(testCharacterB);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    const testCharacterA = { id: 1, name: "TEST A" };
    const testCharacterB = { id: 1, name: "TEST B" };

    it("Si el personaje no se elimina, devuelve el mismo arreglo", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/3312");

      expect(body).toContainEqual(testCharacterA);
      expect(body).toContainEqual(testCharacterB);
    });

    it("Elimina al personaje recibido por ID", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/2");

      expect(body).not.toContainEqual(testCharacterB);
    });
  });
});
