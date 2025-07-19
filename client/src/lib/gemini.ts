// Note: Google AI API calls should be made from the backend for security
// This is a placeholder - actual implementation should go through /api/ai endpoint

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.text
  } catch (error) {
    console.error('Error generating AI response:', error)
    throw new Error('Failed to generate AI response')
  }
}