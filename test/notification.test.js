import test from "node:test";
import assert from "node:assert/strict";
import { prepareNotification, sendNotification } from "../notification-engine.js";

test("notifications require explicit consent", () => {
  const result = prepareNotification({ userId: "u1", message: "Hello" });
  assert.equal(result.status, "not_available");
  assert.equal(result.delivery, "NOT_SENT");
});

test("locked policy blocks notification preparation", () => {
  const result = prepareNotification({ userId: "u1", message: "Hello", consent: true, locked: true });
  assert.equal(result.status, "blocked");
  assert.equal(result.message, null);
});

test("sendNotification never claims a message was delivered", () => {
  const result = sendNotification("u1", "Hello", { consent: true });
  assert.equal(result.status, "provider_not_configured");
  assert.equal(result.delivery, "NOT_SENT");
  assert.equal(result.queued, false);
});

test("invalid messages are rejected", () => {
  assert.throws(() => prepareNotification({ userId: "u1", message: "", consent: true }), TypeError);
  assert.throws(() => prepareNotification({ userId: "u1", message: "x".repeat(2001), consent: true }), TypeError);
});
