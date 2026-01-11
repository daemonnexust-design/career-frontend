// FRONTEND-ONLY / PLACEHOLDER
// No backend integration in Phase 2

export interface EmailDraft {
  subject: string;
  body: string;
  recipient: string;
  generatedAt?: Date;
  scheduledFor?: Date;
}

export type EmailControlState =
  | 'idle'
  | 'generating'
  | 'preview'
  | 'editing'
  | 'schedule-picker'
  | 'confirm-send'
  | 'confirm-schedule'
  | 'confirm-discard'
  | 'sent'
  | 'scheduled';
