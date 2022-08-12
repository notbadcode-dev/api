import request from "supertest";
import app from "../src/app";

import { connectionAuth, connectionLinks } from "../src/database";

const _request = request(app);

describe("Running API", () => {
  it("should return 200 OK", async () => {
    //Arrage

    //Act
    const response = await _request.get("/api/notbadcode");

    // Assert
    expect(response.status).toBe(200);
  }, 10000);
});
