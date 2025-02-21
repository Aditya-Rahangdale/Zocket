import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTaskSuggestions(taskDescription: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful task management assistant. Generate practical suggestions for breaking down and optimizing tasks."
        },
        {
          role: "user",
          content: `Generate 3 specific suggestions for this task: ${taskDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const suggestions = response.choices[0].message.content
      ?.split('\n')
      .filter(suggestion => suggestion.trim().length > 0)
      .map(suggestion => suggestion.replace(/^\d+\.\s*/, '').trim()) || [];

    return suggestions;
  } catch (error) {
    console.error('Error generating task suggestions:', error);
    return [];
  }
}