import test from "node:test";
import assert from "node:assert/strict";
import { sendNotification } from "../notification-engine.js";
test("notification engine never claims delivery without a provider", () => {
  const result = sendNotification("private-user", "private message");
  assert.equal(result.status, "not_configured");
  assert.equal(result.delivered, false);
  assert.equal(result.delivery, "NOT_SENT");
  assert.equal("message" in result, false);
  assert.equal("userId" in result, false);
});
