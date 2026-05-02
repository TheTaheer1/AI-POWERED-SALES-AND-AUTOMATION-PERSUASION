import React, { useEffect, useState } from 'react';
import { Mail, Loader2, RefreshCw, Send } from 'lucide-react';
import { apiClient } from '../api/client';
import { EmailSequence } from '../components/EmailSequence';

const Outreach = () => {
  const [buyerProfile, setBuyerProfile] = useState<any>(null);
  const [emailSequence, setEmailSequence] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('buyerProfile');
    if (saved) {
      setBuyerProfile(JSON.parse(saved));
    }
  }, []);

  const handleGenerateSequence = async () => {
    if (!buyerProfile) return;
    setIsLoading(true);
    try {
      const data = await apiClient.fetchOutreachSequence(buyerProfile);
      setEmailSequence(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!buyerProfile) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-12 h-12 text-primary opacity-50" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Buyer Profile Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">You need to run a research mission first to generate a personalized outreach sequence.</p>
        <a href="/research" className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md">
          Go to Research
        </a>
      </div>
    );
  }

  const prospectEmail = `${buyerProfile.contact_details?.split(' ')[0]?.toLowerCase() || 'prospect'}@${buyerProfile.company_info?.split(' ')[0]?.toLowerCase() || 'company'}.com`;

  return (
    <div className="p-8 max-w-5xl mx-auto transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personalized Outreach</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Generate a hyper-personalized 3-touch email sequence.</p>
        </div>
        <button
          onClick={handleGenerateSequence}
          disabled={isLoading}
          className="mt-4 sm:mt-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 font-medium py-2.5 px-5 rounded-xl transition-colors flex items-center disabled:opacity-70 shadow-md"
        >
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          {emailSequence ? 'Regenerate Sequence' : 'Generate Sequence'}
        </button>
      </div>

      {!emailSequence && !isLoading && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center shadow-sm">
          <Send className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to draft emails</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">We'll use Gemini 1.5 Flash to write highly converting cold emails based on the buyer profile context.</p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse shadow-sm">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
              <div className="h-32 bg-gray-100 dark:bg-gray-700/50 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      )}

      {emailSequence && !isLoading && (
        <EmailSequence emailSequence={emailSequence} prospectEmail={prospectEmail} />
      )}
    </div>
  );
};

export default Outreach;
