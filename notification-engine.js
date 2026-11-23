/**
 * Notification preparation contract. No provider is connected; nothing is sent.
 */
export function prepareNotification({ userId, message, consent = false, locked = false } = {}) {
  if (locked) {
    return { mode: "LOCKED", status: "blocked", userId: null, message: null, delivery: "NOT_SENT" };
  }
  if (consent !== true) {
    return { mode: "CONSENT_REQUIRED", status: "not_available", userId: null, message: null, delivery: "NOT_SENT" };
  }
  if (typeof userId !== "string" || !userId.trim() || userId.length > 128) {
    throw new TypeError("A user identifier between 1 and 128 characters is required.");
  }
  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    throw new TypeError("A non-empty message of at most 2,000 characters is required.");
  }
  return {
    mode: "NORMAL",
    status: "prepared",
    userId: userId.trim(),
    message: message.trim(),
    delivery: "NOT_SENT",
    queued: false,
    note: "Message is prepared only; no notification provider is configured."
  };
}

/**
 * Kept for API compatibility. It deliberately never claims successful delivery.
 */
export function sendNotification(userId, message, options = {}) {
  const prepared = prepareNotification({ userId, message, ...options });
  if (prepared.status !== "prepared") return prepared;
  return {
    ...prepared,
    status: "provider_not_configured",
    delivery: "NOT_SENT",
    queued: false
  };
}
