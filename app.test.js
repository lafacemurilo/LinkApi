const request = require("supertest");
const app = require("./src/app");

describe("GET /async/opportunity/total", () => {
  test("It should respond with status 200", async () => {
    const response = await request(app).get("/async/opportunity/total");
    expect(response.statusCode).toBe(200);
  });

});
