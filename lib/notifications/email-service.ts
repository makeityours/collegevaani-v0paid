import nodemailer from "nodemailer";
import { config } from "@/lib/config/environment";
import { logger } from "@/lib/monitoring/logger";

/**
 * Email template types
 */
export enum EmailTemplate {
  WELCOME = "welcome",
  PASSWORD_RESET = "password-reset",
  VERIFICATION = "verification",
  APPLICATION_SUBMITTED = "application-submitted",
  APPLICATION_STATUS_UPDATE = "application-status-update",
  PAYMENT_CONFIRMATION = "payment-confirmation",
  SUBSCRIPTION_EXPIRING = "subscription-expiring",
}

/**
 * Email recipient interface
 */
interface EmailRecipient {
  email: string;
  name?: string;
}

/**
 * Email data interface
 */
interface EmailData {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  template: EmailTemplate;
  data: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
  cc?: EmailRecipient | EmailRecipient[];
  bcc?: EmailRecipient | EmailRecipient[];
  replyTo?: string;
}

/**
 * Email service for sending notifications
 */
export class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;
  private isConfigured: boolean;

  private constructor() {
    this.isConfigured = this.configureTransporter();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Configure nodemailer transporter
   */
  private configureTransporter(): boolean {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      logger.warn("Email service not configured: Missing SMTP environment variables");
      return false;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT, 10),
        secure: parseInt(SMTP_PORT, 10) === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      logger.info("Email service configured successfully");
      return true;
    } catch (error) {
      logger.error("Failed to configure email service", error as Error);
      return false;
    }
  }

  /**
   * Format recipients for email
   */
  private formatRecipients(recipients: EmailRecipient | EmailRecipient[]): string {
    if (Array.isArray(recipients)) {
      return recipients
        .map((recipient) => {
          if (recipient.name) {
            return `"${recipient.name}" <${recipient.email}>`;
          }
          return recipient.email;
        })
        .join(", ");
    }

    if (recipients.name) {
      return `"${recipients.name}" <${recipients.email}>`;
    }
    
    return recipients.email;
  }

  /**
   * Render email template with data
   */
  private renderTemplate(template: EmailTemplate, data: Record<string, any>): { html: string; text: string } {
    // In a production app, this would use a real templating engine
    // For now, we'll use a simple implementation
    
    let html = "";
    let text = "";

    switch (template) {
      case EmailTemplate.WELCOME:
        html = `
          <h1>Welcome to CollegeVaani, ${data.name}!</h1>
          <p>Thank you for joining our platform. We're excited to help you find the perfect college for your future.</p>
          <p>To get started, please <a href="${data.verificationUrl}">verify your email address</a>.</p>
        `;
        text = `Welcome to CollegeVaani, ${data.name}!\n\nThank you for joining our platform. We're excited to help you find the perfect college for your future.\n\nTo get started, please verify your email address: ${data.verificationUrl}`;
        break;
      
      case EmailTemplate.VERIFICATION:
        html = `
          <h1>Verify your email address</h1>
          <p>Please verify your email address by clicking the link below:</p>
          <p><a href="${data.verificationUrl}">Verify Email Address</a></p>
          <p>This link will expire in 24 hours.</p>
        `;
        text = `Verify your email address\n\nPlease verify your email address by visiting the link below:\n\n${data.verificationUrl}\n\nThis link will expire in 24 hours.`;
        break;
      
      case EmailTemplate.PASSWORD_RESET:
        html = `
          <h1>Reset your password</h1>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <p><a href="${data.resetUrl}">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `;
        text = `Reset your password\n\nYou requested a password reset. Please visit the link below to reset your password:\n\n${data.resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.`;
        break;
      
      case EmailTemplate.APPLICATION_SUBMITTED:
        html = `
          <h1>Application Submitted Successfully</h1>
          <p>Dear ${data.name},</p>
          <p>Your application to ${data.collegeName} for ${data.courseName} has been submitted successfully.</p>
          <p>Application ID: <strong>${data.applicationId}</strong></p>
          <p>You can track the status of your application in your dashboard.</p>
        `;
        text = `Application Submitted Successfully\n\nDear ${data.name},\n\nYour application to ${data.collegeName} for ${data.courseName} has been submitted successfully.\n\nApplication ID: ${data.applicationId}\n\nYou can track the status of your application in your dashboard.`;
        break;
      
      case EmailTemplate.APPLICATION_STATUS_UPDATE:
        html = `
          <h1>Application Status Update</h1>
          <p>Dear ${data.name},</p>
          <p>Your application (ID: ${data.applicationId}) to ${data.collegeName} for ${data.courseName} has been updated.</p>
          <p>Status: <strong>${data.status}</strong></p>
          <p>Please log in to your dashboard for more details.</p>
        `;
        text = `Application Status Update\n\nDear ${data.name},\n\nYour application (ID: ${data.applicationId}) to ${data.collegeName} for ${data.courseName} has been updated.\n\nStatus: ${data.status}\n\nPlease log in to your dashboard for more details.`;
        break;
      
      case EmailTemplate.PAYMENT_CONFIRMATION:
        html = `
          <h1>Payment Confirmation</h1>
          <p>Dear ${data.name},</p>
          <p>Your payment of ₹${data.amount} for ${data.purpose} has been successfully processed.</p>
          <p>Transaction ID: <strong>${data.transactionId}</strong></p>
          <p>Date: ${data.date}</p>
          <p>Thank you for your payment.</p>
        `;
        text = `Payment Confirmation\n\nDear ${data.name},\n\nYour payment of ₹${data.amount} for ${data.purpose} has been successfully processed.\n\nTransaction ID: ${data.transactionId}\n\nDate: ${data.date}\n\nThank you for your payment.`;
        break;
      
      case EmailTemplate.SUBSCRIPTION_EXPIRING:
        html = `
          <h1>Your Subscription is Expiring Soon</h1>
          <p>Dear ${data.name},</p>
          <p>Your ${data.plan} subscription will expire on ${data.expiryDate}.</p>
          <p>To continue enjoying the benefits, please <a href="${data.renewUrl}">renew your subscription</a>.</p>
        `;
        text = `Your Subscription is Expiring Soon\n\nDear ${data.name},\n\nYour ${data.plan} subscription will expire on ${data.expiryDate}.\n\nTo continue enjoying the benefits, please renew your subscription: ${data.renewUrl}`;
        break;
      
      default:
        html = `<p>${JSON.stringify(data)}</p>`;
        text = JSON.stringify(data);
    }

    // Add standard footer
    html += `
      <br><br>
      <hr>
      <p>CollegeVaani - Find Your Perfect College</p>
      <p>© ${new Date().getFullYear()} CollegeVaani. All rights reserved.</p>
    `;
    
    text += `\n\n---\nCollegeVaani - Find Your Perfect College\n© ${new Date().getFullYear()} CollegeVaani. All rights reserved.`;

    return { html, text };
  }

  /**
   * Send email
   */
  public async sendEmail(emailData: EmailData): Promise<boolean> {
    if (!this.isConfigured) {
      logger.warn("Email service not configured, skipping email send");
      return false;
    }

    try {
      const { html, text } = this.renderTemplate(emailData.template, emailData.data);
      
      const mailOptions: nodemailer.SendMailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'CollegeVaani'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: this.formatRecipients(emailData.to),
        subject: emailData.subject,
        text,
        html,
        attachments: emailData.attachments,
      };

      if (emailData.cc) {
        mailOptions.cc = this.formatRecipients(emailData.cc);
      }

      if (emailData.bcc) {
        mailOptions.bcc = this.formatRecipients(emailData.bcc);
      }

      if (emailData.replyTo) {
        mailOptions.replyTo = emailData.replyTo;
      }

      const info = await this.transporter.sendMail(mailOptions);
      
      logger.info(`Email sent successfully: ${info.messageId}`, {
        metadata: {
          template: emailData.template,
          to: mailOptions.to,
          subject: emailData.subject,
        }
      });

      return true;
    } catch (error) {
      logger.error(`Failed to send email: ${emailData.template}`, error as Error, {
        metadata: {
          template: emailData.template,
          to: Array.isArray(emailData.to) 
            ? emailData.to.map(r => r.email) 
            : emailData.to.email,
          subject: emailData.subject,
        }
      });
      return false;
    }
  }

  /**
   * Send welcome email
   */
  public async sendWelcomeEmail(user: { id: string; email: string; name: string }, verificationToken: string): Promise<boolean> {
    const verificationUrl = `${config.app.url}/auth/verify?token=${verificationToken}`;
    
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Welcome to CollegeVaani",
      template: EmailTemplate.WELCOME,
      data: {
        name: user.name,
        verificationUrl,
      },
    });
  }

  /**
   * Send verification email
   */
  public async sendVerificationEmail(user: { id: string; email: string; name?: string }, verificationToken: string): Promise<boolean> {
    const verificationUrl = `${config.app.url}/auth/verify?token=${verificationToken}`;
    
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Verify your email address",
      template: EmailTemplate.VERIFICATION,
      data: {
        name: user.name || "User",
        verificationUrl,
      },
    });
  }

  /**
   * Send password reset email
   */
  public async sendPasswordResetEmail(user: { id: string; email: string; name?: string }, resetToken: string): Promise<boolean> {
    const resetUrl = `${config.app.url}/auth/reset-password?token=${resetToken}`;
    
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Reset your password",
      template: EmailTemplate.PASSWORD_RESET,
      data: {
        name: user.name || "User",
        resetUrl,
      },
    });
  }

  /**
   * Send application confirmation email
   */
  public async sendApplicationSubmittedEmail(
    user: { id: string; email: string; name: string },
    application: { id: string; collegeName: string; courseName: string }
  ): Promise<boolean> {
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Application Submitted Successfully",
      template: EmailTemplate.APPLICATION_SUBMITTED,
      data: {
        name: user.name,
        applicationId: application.id,
        collegeName: application.collegeName,
        courseName: application.courseName,
      },
    });
  }

  /**
   * Send application status update email
   */
  public async sendApplicationStatusUpdateEmail(
    user: { id: string; email: string; name: string },
    application: { id: string; collegeName: string; courseName: string; status: string }
  ): Promise<boolean> {
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Application Status Update",
      template: EmailTemplate.APPLICATION_STATUS_UPDATE,
      data: {
        name: user.name,
        applicationId: application.id,
        collegeName: application.collegeName,
        courseName: application.courseName,
        status: application.status,
      },
    });
  }

  /**
   * Send payment confirmation email
   */
  public async sendPaymentConfirmationEmail(
    user: { id: string; email: string; name: string },
    payment: { id: string; amount: number; purpose: string; date: string }
  ): Promise<boolean> {
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Payment Confirmation",
      template: EmailTemplate.PAYMENT_CONFIRMATION,
      data: {
        name: user.name,
        transactionId: payment.id,
        amount: payment.amount,
        purpose: payment.purpose,
        date: payment.date,
      },
    });
  }

  /**
   * Send subscription expiring email
   */
  public async sendSubscriptionExpiringEmail(
    user: { id: string; email: string; name: string },
    subscription: { plan: string; expiryDate: string }
  ): Promise<boolean> {
    const renewUrl = `${config.app.url}/dashboard/subscription/renew`;
    
    return this.sendEmail({
      to: { email: user.email, name: user.name },
      subject: "Your Subscription is Expiring Soon",
      template: EmailTemplate.SUBSCRIPTION_EXPIRING,
      data: {
        name: user.name,
        plan: subscription.plan,
        expiryDate: subscription.expiryDate,
        renewUrl,
      },
    });
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance(); 