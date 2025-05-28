declare module 'nodemailer' {
  export interface TransportOptions {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
      user: string;
      pass: string;
    };
    [key: string]: any;
  }

  export interface SendMailOptions {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: Array<{
      filename: string;
      content: Buffer | string;
      contentType?: string;
      path?: string;
      [key: string]: any;
    }>;
    replyTo?: string;
    [key: string]: any;
  }

  export interface SendMailResult {
    messageId: string;
    envelope: {
      from: string;
      to: string[];
    };
    accepted: string[];
    rejected: string[];
    pending: string[];
    response: string;
  }

  export interface Transporter {
    sendMail(options: SendMailOptions): Promise<SendMailResult>;
    verify(): Promise<boolean>;
    close(): void;
  }

  export function createTransport(options: TransportOptions): Transporter;
} 