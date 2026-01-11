import { useState } from 'react';
import Layout from '../../components/feature/Layout';
import GenerateEmailButton from './components/GenerateEmailButton';
import GmailConnectionStatus from './components/GmailConnectionStatus';
import EmailPreview from './components/EmailPreview';
import EmailEditor from './components/EmailEditor';
import SendControlPanel from './components/SendControlPanel';
import SchedulePicker from './components/SchedulePicker';
import ConfirmationDialog from '../../components/base/ConfirmationDialog';
import { generateMockEmail } from './utils/mockEmailGenerator';
import { EmailDraft, EmailControlState } from './types';
import { useGmailConnection } from '../../hooks/useGmailConnection';
import { supabase } from '../../lib/supabase';

export default function EmailControlPage() {
  const [state, setState] = useState<EmailControlState>('idle');
  const [email, setEmail] = useState<EmailDraft | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Real Gmail connection hook
  const gmailConnection = useGmailConnection();

  // Generate email handler
  const handleGenerate = () => {
    setState('generating');
    // Mock delay to simulate generation
    setTimeout(() => {
      setEmail(generateMockEmail('ABC Company'));
      setState('preview');
    }, 500);
  };

  // Gmail connection handler - now uses real OAuth
  const handleConnectGmail = () => {
    gmailConnection.connectGmail();
  };

  // Edit handlers
  const handleEdit = () => {
    setState('editing');
  };

  const handleSaveEdit = () => {
    setState('preview');
  };

  const handleCancelEdit = () => {
    setState('preview');
  };

  const handleEmailChange = (field: 'subject' | 'body' | 'recipient', value: string) => {
    if (email) {
      setEmail({ ...email, [field]: value });
    }
  };

  // Send handlers
  const handleSendNow = () => {
    setState('confirm-send');
  };

  const handleConfirmSend = async () => {
    if (!email || !gmailConnection.isConnected) return;

    setIsSending(true);
    setSendError(null);

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          recipient: email.recipient,
          subject: email.subject,
          body: email.body,
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Failed to send email');

      setState('sent');
    } catch (err: any) {
      console.error('Send error:', err);
      setSendError(err.message || 'Failed to send email');
      setState('preview'); // Return to preview on error
    } finally {
      setIsSending(false);
    }
  };

  // Schedule handlers
  const handleSchedule = () => {
    setState('schedule-picker');
  };

  const handleConfirmSchedule = (date: Date) => {
    setScheduledDate(date);
    setState('confirm-schedule');
  };

  const handleFinalizeSchedule = () => {
    if (email && scheduledDate) {
      setEmail({ ...email, scheduledFor: scheduledDate });
      setState('scheduled');
    }
  };

  // Discard handlers
  const handleDiscard = () => {
    setState('confirm-discard');
  };

  const handleConfirmDiscard = () => {
    setEmail(null);
    setScheduledDate(null);
    setState('idle');
  };

  // Cancel handlers
  const handleCancelDialog = () => {
    if (state === 'schedule-picker') {
      setState('preview');
    } else if (state === 'confirm-send' || state === 'confirm-schedule' || state === 'confirm-discard') {
      setState('preview');
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg width="100%" height="100%">
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
          {/* Icon */}
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl">
                <i className="ri-mail-send-line text-3xl md:text-5xl text-white"></i>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                  <i className="ri-edit-line text-xs md:text-sm text-white"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Email Control Center
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 md:mb-6 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Draft, review, and schedule professional emails with complete control
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: 'ri-shield-check-line', text: 'Full Control' },
              { icon: 'ri-google-line', text: 'Gmail' },
              { icon: 'ri-calendar-schedule-line', text: 'Schedule' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-xs md:text-sm text-white">
                <i className={`${item.icon} text-sm md:text-base`}></i>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          {(state === 'idle' || state === 'generating') && (
            <GenerateEmailButton
              onGenerate={handleGenerate}
              isLoading={state === 'generating'}
            />
          )}

          {(state === 'preview' || state === 'editing' || state === 'schedule-picker') && email && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Gmail Connection Status */}
                <GmailConnectionStatus
                  isConnected={gmailConnection.isConnected}
                  email={gmailConnection.email}
                  loading={gmailConnection.loading}
                  onConnect={handleConnectGmail}
                />

                {/* Send Error Message */}
                {sendError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-shake">
                    <i className="ri-error-warning-line text-red-500 text-xl"></i>
                    <div className="flex-grow">
                      <p className="font-semibold text-red-700">Failed to send email</p>
                      <p className="text-sm text-red-600">{sendError}</p>
                    </div>
                    <button
                      onClick={() => setSendError(null)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>
                )}

                {/* Email Preview or Editor */}
                {state === 'editing' ? (
                  <EmailEditor
                    subject={email.subject}
                    body={email.body}
                    recipient={email.recipient}
                    onChange={handleEmailChange}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : state === 'schedule-picker' ? (
                  <SchedulePicker
                    onSchedule={handleConfirmSchedule}
                    onCancel={handleCancelDialog}
                  />
                ) : (
                  <EmailPreview
                    email={email}
                    onEdit={handleEdit}
                  />
                )}
              </div>

              {/* Sidebar: Send Controls */}
              <div className="lg:col-span-1">
                <SendControlPanel
                  onSendNow={handleSendNow}
                  onSchedule={handleSchedule}
                  onDiscard={handleDiscard}
                  disabled={!gmailConnection.isConnected || isSending}
                />
              </div>
            </div>
          )}

          {(state === 'sent' || state === 'scheduled') && (
            <div className="text-center py-8 md:py-12">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl">
                  <i className="ri-checkbox-circle-line text-3xl md:text-4xl text-white"></i>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
                {state === 'sent' ? 'Email Sent Successfully!' : 'Email Scheduled!'}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                {state === 'sent'
                  ? 'Your application email has been sent.'
                  : `Your email will be sent on ${scheduledDate?.toLocaleString()}`
                }
              </p>

              <button
                onClick={() => {
                  setEmail(null);
                  setScheduledDate(null);
                  setState('idle');
                }}
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 cursor-pointer whitespace-nowrap text-sm md:text-base"
              >
                <i className="ri-add-line"></i>
                Create Another Email
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={state === 'confirm-send'}
        title="Send Email Now?"
        message="Send this email immediately? This action cannot be undone."
        confirmText="Send Now"
        cancelText="Cancel"
        variant="info"
        onConfirm={handleConfirmSend}
        onCancel={handleCancelDialog}
      />

      <ConfirmationDialog
        isOpen={state === 'confirm-schedule'}
        title="Schedule Email?"
        message={`Schedule this email for ${scheduledDate?.toLocaleString()}? You can cancel scheduled emails later.`}
        confirmText="Confirm Schedule"
        cancelText="Cancel"
        variant="info"
        onConfirm={handleFinalizeSchedule}
        onCancel={handleCancelDialog}
      />

      <ConfirmationDialog
        isOpen={state === 'confirm-discard'}
        title="Discard Draft?"
        message="Discard this draft? All changes will be lost."
        confirmText="Discard"
        cancelText="Keep Draft"
        variant="danger"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDialog}
      />
    </Layout>
  );
}
