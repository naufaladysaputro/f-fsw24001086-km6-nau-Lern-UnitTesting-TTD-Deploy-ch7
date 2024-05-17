const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
  it("success login", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/login").send(user);
    expect(response.statusCode).toBe(201);
  });

  it("failed login : wrong password", async () => {
    const failedUser = {
      email: "nopal@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(400);
  });

  it("failed login : email is not registered", async () => {
    const failedUser = {
      email: "alif@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(400);
  });
});

describe("API check token", () => {
  it("success check token", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJDVVNUT01FUiJ9LCJpYXQiOjE3MTU5NjMzMDl9.ezMkYMIlwU2Q_aIWF8lZEwILYlKzawX1m2LtFTPc6ZM";
    const response = await request(app)
      .get("/v1/auth/whoami")
      .set("Authorization", `Bearer ${token}`);
      console.log("===");
      console.log(response);
      console.log("===");
    expect(response.statusCode).toBe(200);
  },10000);

  it("failed check token: wrong token", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6Ikpvam8iLCJlbWFpbCI6Impvam9AYmluYXIuY28uaWQiLCJpbWFnZSI6bnVsbCwicm9sZSI6eyJpZCI6MSwibmFtZSI6IkNVU1RPTUVSIn0sImlhdCI6MTcwMDAzNjY0MH0.fqJLyXERO8SzlY478mb2_BTgc7WaDIf3vRjgca3k6q3";
    const response = await request(app)
      .get("/v1/auth/whoami")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });
});
