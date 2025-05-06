/** @format */

export const promptPluralWith = (userInput: string) => {
  return `
You will be given a portion of an HTML web page, typically containing structured data like a list or table. Your task is to convert this data into multiple questions and answers, and then output them in a specific JSON format.

Here is the HTML content you will be working with:

<html_content>
${userInput}
</html_content>

Follow these steps to complete the task:

1. Analyze the HTML content:
   - Identify the type of data structure (e.g., list, table, or other)
   - Determine the main topic or theme of the content
   - Identify key pieces of information that can be turned into questions and answers

2. Create questions and answers:
   - For each significant piece of information, formulate a question that can be answered using that information
   - Ensure that the answer to each question can be directly found in or inferred from the HTML content
   - Create at least 3 questions and answers, but no more than 10
   - Make sure the questions are diverse and cover different aspects of the content

3. Format the output:
   - Create a valid JSON object with one property "flashcards" that is an array containing objects with "question" and "answer" properties
   - Each flashcard object should represent one question-answer pair
   - Ensure that the JSON is properly formatted and valid

Here's an example of how your output should be structured:

<example>
{
    flashcards: [
        {
            "question": "What is the capital of France?",
            "answer": "Paris"
        },
        {
            "question": "Who painted the Mona Lisa?",
            "answer": "Leonardo da Vinci"
        },
        {
            "question": "What year did World War II end?",
            "answer": "1945"
        }
    ]
}
</example>

Now, analyze the provided HTML content, create appropriate questions and answers based on the information it contains, and output the result in the specified JSON format. do not include any whitespace or new lines.

Begin the task now.
`;
};
