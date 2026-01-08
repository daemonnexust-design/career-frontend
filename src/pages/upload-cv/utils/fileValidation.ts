export const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFileType(file: File): ValidationResult {
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
  const hasValidMimeType = ALLOWED_TYPES.includes(file.type);

  if (!hasValidExtension && !hasValidMimeType) {
    return {
      valid: false,
      error: 'Please upload a PDF or DOCX file only.'
    };
  }

  return { valid: true };
}

export function validateFileSize(file: File, maxMB: number = MAX_FILE_SIZE_MB): ValidationResult {
  const maxBytes = maxMB * 1024 * 1024;
  
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File size must be less than ${maxMB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`
    };
  }

  return { valid: true };
}

export function validateFile(file: File): ValidationResult {
  const typeValidation = validateFileType(file);
  if (!typeValidation.valid) {
    return typeValidation;
  }

  const sizeValidation = validateFileSize(file);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }
}
