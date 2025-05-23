/** @format */

import Anthropic from '@anthropic-ai/sdk';
import type { ParsedResponse } from '../model.js';
import { promptPluralWith } from '../prompts/plural.js';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
const model = 'claude-3-haiku-20240307';
// TODO: move this call server side

const anthropic = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

export default async function prompt(userInput: string) {
  const msg = await anthropic.messages.create({
    model,
    max_tokens: 1000,
    temperature: 1,
    system:
      'you are an expert at turning data into specific and memorable questions and answers',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: promptPluralWith(userInput),
          },
        ],
      },
    ],
  });
  console.log(msg);
  return assertContent(msg);
}

function assertContent(message: Anthropic.Messages.Message) {
  const content = message.content[0];
  if (content != null && content.type === 'text') {
    return formatContentToJSON(content.text);
  }
  return {
    status: 'failure',
    message: 'missing content',
  } as ParsedResponse;
}

function formatContentToJSON(content: string) {
  try {
    return {
      status: 'success',
      ...JSON.parse(content),
    } as ParsedResponse;
  } catch (err) {
    console.warn(err);
    return {
      status: 'failure',
      message: 'error parsing content',
    } as ParsedResponse;
  }
}
