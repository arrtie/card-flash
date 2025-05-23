/** @format */

import type { ReactEventHandler } from 'react';
import { styled } from 'styled-components';

const Label = styled.label`
  display: flex;
  justifycontent: flex-start;
  flexdirection: column;
`;

const Form = styled.form`
  display: flex;
  justifycontent: flex-start;
  flexdirection: column;
`;

interface ManualFlashcardProps {
  handleSubmit: ReactEventHandler<HTMLFormElement>;
}

export default function ManualFlashcard({
  handleSubmit,
}: ManualFlashcardProps) {
  return (
    <section>
      <h2>Manual</h2>
      <Form
        onSubmit={handleSubmit}
        name="flashcard_submission"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Label htmlFor="question">
          Question: <span aria-label="required">*</span>
          <textarea id="question" name="question" required rows={6}></textarea>
        </Label>
        <label htmlFor="answer">
          Answer: <span aria-label="required">*</span>
          <textarea id="answer" name="answer" required rows={6}></textarea>
        </label>
        <button type="submit">Flash card</button>
      </Form>
    </section>
  );
}
