/**
 * Reusable telemetry simulator for portal primary actions.
 * Never logs sensitive personal data (e.g. emails, full phone numbers, passwords).
 */
export function logAnalyticsEvent(
  action: string,
  metadata?: Record<string, unknown>
): void {
  const safePayload = {
    action,
    timestamp: new Date().toISOString(),
    ...(metadata ? sanitizeTelemetryData(metadata) : {}),
  };

  console.log(
    "[Analytics] User interacted with End-to-End Frequent Flyer Portal",
    safePayload
  );
}

function sanitizeTelemetryData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(data)) {
    // Redact any potentially sensitive keys
    if (["email", "phone", "password", "token"].includes(key.toLowerCase())) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = val;
    }
  }
  return sanitized;
}
