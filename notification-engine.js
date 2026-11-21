export function sendNotification(_userId, _message) {
  return {
    status: "not_configured",
    delivered: false,
    delivery: "NOT_SENT",
    reason: "NOTIFICATION_PROVIDER_NOT_CONFIGURED",
    note: "No notification provider is connected; no message was sent."
  };
}
