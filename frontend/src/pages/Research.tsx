import React from 'react';
import { Search, Loader2, Briefcase, User, Box } from 'lucide-react';
import { useResearch } from '../hooks/useResearch';
import { ResearchStream } from '../components/ResearchStream';
import { BuyerProfileCard } from '../components/BuyerProfileCard';

const Research = () => {
  const { formData, setFormData, isLoading, activeSteps, buyerProfile, startResearch } = useResearch();

  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Prospect Research</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Generate a comprehensive buyer profile using AI-powered web scraping.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-fit transition-colors duration-300">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Search className="w-5 h-5 mr-2 text-primary" />
            Research Parameters
          </h2>
          <form onSubmit={startResearch} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 transition-all"
                  placeholder="e.g. Acme Corp"
                  value={formData.company_name}
                  onChange={e => setFormData({...formData, company_name: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 transition-all"
                    placeholder="e.g. John Doe"
                    value={formData.contact_name}
                    onChange={e => setFormData({...formData, contact_name: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 transition-all"
                  placeholder="e.g. VP Sales"
                  value={formData.contact_title}
                  onChange={e => setFormData({...formData, contact_title: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Our Product Value Prop</label>
              <div className="relative">
                <Box className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  required
                  rows={3}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white dark:bg-gray-700 transition-all resize-none"
                  placeholder="Describe what we are selling..."
                  value={formData.our_product}
                  onChange={e => setFormData({...formData, our_product: e.target.value})}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Gathering Intel...</>
              ) : (
                'Run Research Agent'
              )}
            </button>
          </form>
        </div>

        {/* Live Progress / Results Section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-800 p-6 flex flex-col relative overflow-hidden transition-colors duration-300 h-[600px]">
          <ResearchStream activeSteps={activeSteps} isLoading={isLoading} />
          {buyerProfile && <BuyerProfileCard buyerProfile={buyerProfile} />}
        </div>
      </div>
    </div>
  );
};

export default Research;
