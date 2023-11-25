import { app } from "../app.js"
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";


Deno.test({
  name: "Test /",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", new RegExp("application/json"))

  },
  sanitizeResources: false,
  sanitizeOps: false,
});

