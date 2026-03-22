import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { certificateApi } from '../services/api';

interface CertificateData {
  id: string;
  certificate_id: string;
  user_id: string;
  course_id: string;
  course_title: string;
  holder_name: string;
  instructor_name: string;
  issue_date: string;
  completion_date: string;
  credential_url: string;
}

export function CertificateVerifyPage() {
  const [searchParams] = useSearchParams();
  const certificateId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!certificateId) {
      setLoading(false);
      setMessage('No certificate ID provided.');
      return;
    }

    const verifyCert = async () => {
      setLoading(true);
      try {
        const result = await certificateApi.verify(certificateId);
        setVerified(result.verified);
        setCertificate(result.certificate);
        setMessage(result.message);
      } catch (err: any) {
        setVerified(false);
        setMessage(err.message || 'Verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyCert();
  }, [certificateId]);

  return (
    <div className="min-h-screen bg-[#f8f9fb] font-body">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5e81ac] to-[#81a1c1] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-white text-xl">school</span>
            </div>
            <span className="text-xl font-black text-[#2e3440] font-headline tracking-tight">FundMySkill</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50">Certificate Verification</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 animate-pulse">
            <div className="w-20 h-20 rounded-full bg-[#5e81ac]/10 flex items-center justify-center mb-6">
              <svg className="animate-spin h-10 w-10 text-[#5e81ac]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-[#4c566a]">Verifying certificate...</p>
            <p className="text-sm text-[#4c566a]/60 mt-2">Please wait while we validate the credentials</p>
          </div>
        )}

        {/* Verified Successfully */}
        {!loading && verified && certificate && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Verification Badge */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-[2rem] p-8 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 shrink-0">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-green-800 font-headline tracking-tight mb-1">Certificate Verified ✓</h1>
                <p className="text-sm text-green-700/70 leading-relaxed">
                  This certificate is authentic and has been verified on the FundMySkill platform.
                </p>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(46,52,64,0.06)] border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#2e3440] to-[#3b4252] p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <span className="material-symbols-outlined text-white text-xl">school</span>
                  </div>
                  <span className="text-xl font-black text-white font-headline tracking-tight">FundMySkill</span>
                </div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ebcb8b] mb-2">Certificate of Completion</h2>
              </div>

              <div className="p-10 space-y-8">
                {/* Holder */}
                <div className="text-center pb-8 border-b border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4c566a]/50 mb-2">Awarded To</p>
                  <h2 className="text-4xl font-black text-[#2e3440] font-headline tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                    {certificate.holder_name}
                  </h2>
                </div>

                {/* Course */}
                <div className="text-center pb-8 border-b border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4c566a]/50 mb-2">For Successfully Completing</p>
                  <h3 className="text-2xl font-black text-[#5e81ac] font-headline tracking-tight">
                    {certificate.course_title}
                  </h3>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-[#f8f9fb] rounded-xl p-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4c566a]/50 mb-1">Instructor</p>
                    <p className="text-sm font-bold text-[#2e3440]">{certificate.instructor_name}</p>
                  </div>
                  <div className="bg-[#f8f9fb] rounded-xl p-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4c566a]/50 mb-1">Issue Date</p>
                    <p className="text-sm font-bold text-[#2e3440]">
                      {new Date(certificate.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="bg-[#f8f9fb] rounded-xl p-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4c566a]/50 mb-1">Completion</p>
                    <p className="text-sm font-bold text-[#2e3440]">
                      {new Date(certificate.completion_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="bg-[#f8f9fb] rounded-xl p-4 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4c566a]/50 mb-1">Status</p>
                    <p className="text-sm font-bold text-green-600 flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Verified
                    </p>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="bg-[#f8f9fb] rounded-xl p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4c566a]/50 mb-2">Certificate ID</p>
                  <p className="text-[11px] font-mono text-[#5e81ac]/70 break-all leading-relaxed">
                    {certificate.certificate_id}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center py-4">
              <p className="text-[10px] text-[#4c566a]/40 font-bold">
                This certificate was issued by FundMySkill EdTech Platform. For any inquiries, contact support@fundmyskill.com
              </p>
            </div>
          </div>
        )}

        {/* Not Verified */}
        {!loading && !verified && (
          <div className="flex flex-col items-center justify-center py-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6 border-2 border-red-100">
              <span className="material-symbols-outlined text-red-400 text-5xl">gpp_bad</span>
            </div>
            <h1 className="text-3xl font-black text-[#2e3440] font-headline tracking-tight mb-2">Verification Failed</h1>
            <p className="text-sm text-[#4c566a]/60 max-w-md text-center leading-relaxed mb-8">
              {message || 'This certificate ID is invalid or does not exist in our records.'}
            </p>
            <Link
              to="/"
              className="px-8 py-3 bg-[#5e81ac] text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-[#5e81ac]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Go to Homepage
            </Link>
          </div>
        )}
      </main>

      {/* Material Symbols */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </div>
  );
}
