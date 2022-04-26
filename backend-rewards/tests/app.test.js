const request = require("supertest");
const app = require("../index");

describe("GET and PATCH", () => {
  const userReward = [
    {
      availableAt: "2022-04-24T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-04-25T00:00:00Z",
    },
    {
      availableAt: "2022-04-25T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-04-26T00:00:00Z",
    },
    {
      availableAt: "2022-04-26T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-04-27T00:00:00Z",
    },
    {
      availableAt: "2022-04-27T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-04-28T00:00:00Z",
    },
    {
      availableAt: "2022-04-28T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-04-29T00:00:00Z",
    },
    {
      availableAt: "2022-04-29T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-04-30T00:00:00Z",
    },
    {
      availableAt: "2022-04-30T00:00:00Z",
      redeemedAt: null,
      expiresAt: "2022-05-01T00:00:00Z",
    },
  ];

  it("should create a reward list", async () => {
    const res = await request(app).get(
      "/users/4/rewards?at=2022-04-25T02:37:22Z"
    );

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(userReward);
  });

  it("should fail user id", async () => {
    const res = await request(app).get(
      "/users/rewards?at=2022-04-25T02:37:22Z"
    );
    expect(res.statusCode).toEqual(404);
  });

  it("should redeem a reward", async () => {
    const res = await request(app).patch(
      "/users/4/rewards/2022-04-26T00:00:00Z/redeem"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.availableAt).toEqual("2022-04-26T00:00:00Z");
    expect(res.body.expiresAt).toEqual("2022-04-27T00:00:00Z");
  });

  it("should fail user date", async () => {
    const res = await request(app).get("/users/4/rewards/redeem");
    expect(res.statusCode).toEqual(404);
  });
});
