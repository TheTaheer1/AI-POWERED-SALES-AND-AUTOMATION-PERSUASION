const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8000/api');

export const apiClient = {
  async fetchOutreachSequence(buyerProfile: any) {
    const response = await fetch(`${API_URL}/outreach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyer_profile: buyerProfile }),
    });
    if (!response.ok) throw new Error('Failed to generate sequence');
    return response.json();
  },

  async fetchCoachingFeedback(chunk: string, history: string[]) {
    const response = await fetch(`${API_URL}/coach`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transcript_chunk: chunk,
        conversation_history: history
      }),
    });
    if (!response.ok) throw new Error('Failed to get coaching feedback');
    return response.json();
  },

  async fetchPostCallIntelligence(fullTranscript: string, buyerProfile: any) {
    const response = await fetch(`${API_URL}/post-call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_transcript: fullTranscript,
        buyer_profile: buyerProfile
      }),
    });
    if (!response.ok) throw new Error('Failed to generate post-call intelligence');
    return response.json();
  },

  async streamResearch(formData: any) {
    const response = await fetch(`${API_URL}/research/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.body) throw new Error('No readable stream');
    return response.body;
  }
};
