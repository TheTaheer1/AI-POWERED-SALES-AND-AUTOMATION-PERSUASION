import { useState } from 'react';
import { apiClient } from '../api/client';

export const useResearch = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_title: '',
    our_product: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeSteps, setActiveSteps] = useState<{name: string, status: 'running' | 'complete'}[]>([]);
  const [buyerProfile, setBuyerProfile] = useState<any>(null);

  const startResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setActiveSteps([]);
    setBuyerProfile(null);

    try {
      const stream = await apiClient.streamResearch(formData);
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n').filter(Boolean);

        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.status === 'progress') {
              const msg = data.message;
              if (msg.includes('Running tool:')) {
                const toolName = msg.replace('Running tool: ', '').replace('...', '').trim();
                setActiveSteps(prev => [...prev, { name: toolName, status: 'running' }]);
              } else if (msg.includes('Analyzed results from')) {
                const toolName = msg.replace('Analyzed results from ', '').replace('.', '').trim();
                setActiveSteps(prev => prev.map(s => s.name === toolName ? { ...s, status: 'complete' } : s));
              }
            } else if (data.status === 'complete') {
              setBuyerProfile(data.profile);
              setIsLoading(false);
              localStorage.setItem('buyerProfile', JSON.stringify(data.profile));
            } else if (data.status === 'error') {
              setIsLoading(false);
            }
          } catch (e) {
            console.error('Failed to parse SSE line', line);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return { formData, setFormData, isLoading, activeSteps, buyerProfile, startResearch };
};
