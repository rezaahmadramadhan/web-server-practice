const app = require("../app.js");
const { User, sequelize } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");

const userData = {
  email: "assistance.khanz@mail.com",
  password: "123456",
};

const userData2 = {
  email: "assistance.zakhaev@mail.com",
  password: "123456",
};

let groceryData = {
  title: "Milk",
  price: 5000,
  tag: "dairy",
  imageUrl: "http://example.com/milk.jpg",
};

let updatedGroceryData = {
  title: "Chocolate Milk",
  price: 6000,
  tag: "dairy",
  imageUrl: "http://example.com/chocolate_milk.jpg",
};

let userToken1, userToken2;
let groceryId;
let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidtoken";

beforeAll((done) => {
  User.create(userData)
    .then((user) => {
      userToken1 = signToken({ id: user.id, email: user.email }, "secret");
      return User.create(userData2);
    })
    .then((user2) => {
      userToken2 = signToken({ id: user2.id, email: user2.email }, "secret");
      done();
    })
    .catch(done);
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Groceries", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => {
      return queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => done())
    .catch(done);
});

describe("GET /groceries", () => {
  test("200 success get groceries (empty array initially)", (done) => {
    request(app)
      .get("/groceries")
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch(done);
  });

  test("401 get groceries without token", (done) => {
    request(app)
      .get("/groceries")
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });

  test("401 get groceries with invalid token", (done) => {
    request(app)
      .get("/groceries")
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });
});

describe("POST /groceries", () => {
  test("201 success create grocery", (done) => {
    request(app)
      .post("/groceries")
      .send(groceryData)
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        const { status, body } = response;
        groceryId = body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("title", groceryData.title);
        expect(body).toHaveProperty("price", groceryData.price);
        expect(body).toHaveProperty("tag", groceryData.tag);
        expect(body).toHaveProperty("imageUrl", groceryData.imageUrl);
        expect(body).toHaveProperty("UserId", expect.any(Number));
        done();
      })
      .catch(done);
  });

  test("401 create grocery without token", (done) => {
    request(app)
      .post("/groceries")
      .send(groceryData)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });

  test("401 create grocery with invalid token", (done) => {
    request(app)
      .post("/groceries")
      .send(groceryData)
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });
});

describe("PUT /groceries/:id", () => {
  test("200 success update grocery by authorized user", (done) => {
    request(app)
      .put(`/groceries/${groceryId}`)
      .send(updatedGroceryData)
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Grocery item has been updated");
        done();
      })
      .catch(done);
  });

  test("403 update grocery unauthorized (wrong user)", (done) => {
    request(app)
      .put(`/groceries/${groceryId}`)
      .send(updatedGroceryData)
      .set("Authorization", `Bearer ${userToken2}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "You are not authorized");
        done();
      })
      .catch(done);
  });

  test("401 update grocery without token", (done) => {
    request(app)
      .put(`/groceries/${groceryId}`)
      .send(updatedGroceryData)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });

  test("401 update grocery with invalid token", (done) => {
    request(app)
      .put(`/groceries/${groceryId}`)
      .send(updatedGroceryData)
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });

  test("404 update grocery not found", (done) => {
    request(app)
      .put("/groceries/9999")
      .send(updatedGroceryData)
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Data not found");
        done();
      })
      .catch(done);
  });
});

describe("DELETE /groceries/:id", () => {
  let groceryIdToDelete;
  beforeEach((done) => {
    request(app)
      .post("/groceries")
      .send(groceryData)
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        groceryIdToDelete = response.body.id;
        done();
      })
      .catch(done);
  });

  test("403 delete grocery unauthorized user", (done) => {
    request(app)
      .delete(`/groceries/${groceryIdToDelete}`)
      .set("Authorization", `Bearer ${userToken2}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "You are not authorized");
        done();
      })
      .catch(done);
  });

  test("200 success delete grocery", (done) => {
    request(app)
      .delete(`/groceries/${groceryIdToDelete}`)
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Grocery item has been deleted");
        done();
      })
      .catch(done);
  });

  test("401 delete grocery without token", (done) => {
    request(app)
      .delete(`/groceries/${groceryIdToDelete}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });

  test("401 delete grocery with invalid token", (done) => {
    request(app)
      .delete(`/groceries/${groceryIdToDelete}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch(done);
  });

  test("404 delete grocery not found", (done) => {
    request(app)
      .delete("/groceries/9999")
      .set("Authorization", `Bearer ${userToken1}`)
      .then((response) => {
        const { status, body } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Data not found");
        done();
      })
      .catch(done);
  });
});
