import React, { useState } from 'react';
import { Copy, CheckCircle2, Send, Paperclip, Image as ImageIcon, Link, Smile, MoreVertical, Trash2, User } from 'lucide-react';

export const EmailSequence = ({ emailSequence, prospectEmail }: { emailSequence: any, prospectEmail: string }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sequence = [
    { key: 'email_1', title: 'Touch 1: Cold Intro', data: emailSequence.email_1 },
    { key: 'email_2', title: 'Touch 2: Value & Social Proof', data: emailSequence.email_2 },
    { key: 'email_3', title: 'Touch 3: Breakup / Urgency', data: emailSequence.email_3 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {sequence.map((item, index) => (
        <div key={item.key} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg flex flex-col">
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {index + 1}
              </div>
              <h3 className="font-bold text-gray-700 dark:text-gray-200 text-sm">{item.title}</h3>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                {item.data.predicted_open_rate} Open Rate
              </span>
            </div>
          </div>
          
          <div className="flex flex-col bg-white dark:bg-gray-800 relative group">
            <button 
              onClick={() => handleCopy(`${item.data.subject_line}\n\n${item.data.body}\n\nJohn Doe\nSales Executive`, index)}
              className="absolute top-4 right-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm p-2 rounded-lg text-gray-500 hover:text-primary dark:text-gray-300 transition-all opacity-0 group-hover:opacity-100 z-10 flex items-center space-x-2"
            >
              {copiedIndex === index ? <><CheckCircle2 className="w-4 h-4 text-green-500" /><span className="text-xs font-medium text-green-500">Copied</span></> : <><Copy className="w-4 h-4" /><span className="text-xs font-medium">Copy Draft</span></>}
            </button>

            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400 w-12">To</span>
              <div className="bg-blue-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full text-xs font-medium border border-blue-100 dark:border-gray-600 flex items-center">
                <User className="w-3 h-3 mr-1" />
                {prospectEmail}
              </div>
            </div>
            
            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400 w-12">Subject</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{item.data.subject_line}</span>
            </div>

            <div className="p-6">
              <textarea 
                readOnly 
                value={`${item.data.body}\n\n--\nJohn Doe\nSales Executive\nSalesGenie.ai`} 
                className="w-full h-48 bg-transparent text-gray-800 dark:text-gray-200 text-sm leading-relaxed resize-none outline-none"
              />
              
              <div className="mt-4 mb-2 flex flex-wrap gap-2">
                {item.data.personalization_hooks_used.map((hook: string, i: number) => (
                  <span key={i} className="text-[10px] uppercase font-bold text-purple-500 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
                    # {hook}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-4">
                <button className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded text-sm shadow flex items-center transition-colors">
                  Send <Send className="w-3 h-3 ml-2" />
                </button>
                <div className="flex space-x-3 text-gray-400 dark:text-gray-500">
                  <Paperclip className="w-4 h-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                  <Link className="w-4 h-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                  <Smile className="w-4 h-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                  <ImageIcon className="w-4 h-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                </div>
              </div>
              <div className="flex space-x-3 text-gray-400 dark:text-gray-500">
                <MoreVertical className="w-4 h-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
