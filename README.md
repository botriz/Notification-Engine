# Suraya Notification Engine

A consent-gated notification preparation contract. This repository does not contain an email, SMS, push, or messaging delivery provider.

## API

- `prepareNotification({ userId, message, consent, locked })`: validates and prepares a message only.
- `sendNotification(userId, message, options)`: compatibility wrapper that always reports `NOT_SENT` until a delivery provider is explicitly integrated.

Policy lock blocks the request. Explicit consent is required. Message length is capped at 2,000 characters. No "Savior" or priority override can bypass policy.

## Validation

```bash
npm test
```

Do not present a prepared message as delivered or use this module for urgent or emergency communications.
