// FRONTEND-ONLY / PLACEHOLDER
// No backend persistence in Phase 1
export interface UploadedCV {
  file: File;
  name: string;
  size: number; // bytes
  type: 'pdf' | 'docx';
  uploadedAt: Date;
}
