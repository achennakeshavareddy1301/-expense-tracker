<<<<<<< HEAD
import request from "supertest";
import app from "../src/app";
import fs from "fs/promises";
import path from "path";

const dataFile = path.join(__dirname, "../src/data/expenses.json");

describe("Smart Expense Tracker API", () => {
  beforeEach(async () => {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2));
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Expense Tracker API is running.");
    });
  });

  describe("POST /api/expenses", () => {
    it("should create a new expense", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          title: "Lunch",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Lunch");
      expect(res.body.data.amount).toBe(250);
      expect(res.body.data.category).toBe("Food");
      expect(res.body.data.id).toBeDefined();
    });

    it("should return 400 for invalid request", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          amount: 250,
          category: "Food",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject negative amount", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          title: "Lunch",
          amount: -50,
          category: "Food",
          date: "2026-07-31",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/expenses", () => {
    beforeEach(async () => {
      await request(app).post("/api/expenses").send({
        title: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/expenses").send({
        title: "Movie",
        amount: 500,
        category: "Entertainment",
        date: "2026-07-30",
      });
    });

    it("should return all expenses", async () => {
      const res = await request(app).get("/api/expenses");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    it("should filter expenses by category", async () => {
      const res = await request(app).get(
        "/api/expenses?category=Food"
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].category).toBe("Food");
    });
  });

  describe("GET /api/expenses/summary", () => {
    beforeEach(async () => {
      await request(app).post("/api/expenses").send({
        title: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/expenses").send({
        title: "Movie",
        amount: 500,
        category: "Entertainment",
        date: "2026-07-30",
      });
    });

    it("should return total expense summary", async () => {
      const res = await request(app).get("/api/expenses/summary");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBe(750);
    });

    it("should return category summary", async () => {
      const res = await request(app).get(
        "/api/expenses/summary?category=Food"
      );

      expect(res.status).toBe(200);
      expect(res.body.data.total).toBe(250);
    });
  });

  describe("DELETE /api/expenses/:id", () => {
    it("should delete an expense", async () => {
      const created = await request(app)
        .post("/api/expenses")
        .send({
          title: "Lunch",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

      const id = created.body.data.id;

      const del = await request(app).delete(
        `/api/expenses/${id}`
      );

      expect(del.status).toBe(204);

      const all = await request(app).get("/api/expenses");

      expect(all.body.data.length).toBe(0);
    });

    it("should return 404 for unknown expense", async () => {
      const res = await request(app).delete(
        "/api/expenses/invalid-id"
      );

      expect(res.status).toBe(404);
    });
  });
});
=======
import request from "supertest";
import app from "../src/app";
import fs from "fs/promises";
import path from "path";

const dataFile = path.join(__dirname, "../src/data/expenses.json");

describe("Smart Expense Tracker API", () => {
  beforeEach(async () => {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2));
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Expense Tracker API is running.");
    });
  });

  describe("POST /api/expenses", () => {
    it("should create a new expense", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          title: "Lunch",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Lunch");
      expect(res.body.data.amount).toBe(250);
      expect(res.body.data.category).toBe("Food");
      expect(res.body.data.id).toBeDefined();
    });

    it("should return 400 for invalid request", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          amount: 250,
          category: "Food",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should reject negative amount", async () => {
      const res = await request(app)
        .post("/api/expenses")
        .send({
          title: "Lunch",
          amount: -50,
          category: "Food",
          date: "2026-07-31",
        });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/expenses", () => {
    beforeEach(async () => {
      await request(app).post("/api/expenses").send({
        title: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/expenses").send({
        title: "Movie",
        amount: 500,
        category: "Entertainment",
        date: "2026-07-30",
      });
    });

    it("should return all expenses", async () => {
      const res = await request(app).get("/api/expenses");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    it("should filter expenses by category", async () => {
      const res = await request(app).get(
        "/api/expenses?category=Food"
      );

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].category).toBe("Food");
    });
  });

  describe("GET /api/expenses/summary", () => {
    beforeEach(async () => {
      await request(app).post("/api/expenses").send({
        title: "Lunch",
        amount: 250,
        category: "Food",
        date: "2026-07-31",
      });

      await request(app).post("/api/expenses").send({
        title: "Movie",
        amount: 500,
        category: "Entertainment",
        date: "2026-07-30",
      });
    });

    it("should return total expense summary", async () => {
      const res = await request(app).get("/api/expenses/summary");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBe(750);
    });

    it("should return category summary", async () => {
      const res = await request(app).get(
        "/api/expenses/summary?category=Food"
      );

      expect(res.status).toBe(200);
      expect(res.body.data.total).toBe(250);
    });
  });

  describe("DELETE /api/expenses/:id", () => {
    it("should delete an expense", async () => {
      const created = await request(app)
        .post("/api/expenses")
        .send({
          title: "Lunch",
          amount: 250,
          category: "Food",
          date: "2026-07-31",
        });

      const id = created.body.data.id;

      const del = await request(app).delete(
        `/api/expenses/${id}`
      );

      expect(del.status).toBe(204);

      const all = await request(app).get("/api/expenses");

      expect(all.body.data.length).toBe(0);
    });

    it("should return 404 for unknown expense", async () => {
      const res = await request(app).delete(
        "/api/expenses/invalid-id"
      );

      expect(res.status).toBe(404);
    });
  });
});
>>>>>>> 568ce4a (Complete Smart Expense Tracker assignment)
