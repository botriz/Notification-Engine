notification-engine.jsimport { identity } from "suraya-global-intelligence-core/suraya-identity.js";
import { isLocked, isSavior } from "suraya-global-intelligence-core/suraya-lock.js";

export function sendNotification(userId, message) {
  const core = identity();

  if (isSavior()) {
    return {
      mode: "SAVIOR",
      userId,
      message: `[GLOBAL PRIORITY] ${message}`,
      delivery: "INSTANT",
      note: "Notification Engine running in Savior mode."
    };
  }

  if (isLocked()) {
    return {
      mode: "LOCKED",
      userId,
      message: null,
      delivery: "BLOCKED",
      note: "Notification Engine locked by core."
    };
  }

  return {
    mode: "NORMAL",
    userId,
    message,
    delivery: "STANDARD",
    note: "Notification Engine running normally."
  };
}
