/** @format */

const labelStyle = {
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
};

interface ManualFlashcardProps {
  handleSubmit: (e: Event & { currentTarget: HTMLFormElement }) => void;
}

export default function ManualFlashcard({
  handleSubmit,
}: ManualFlashcardProps) {
  return (
    <section>
      <h2>Manual</h2>
      <form
        onSubmit={handleSubmit}
        name="flashcard_submission"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <label for="question" style={labelStyle}>
          Question: <span aria-label="required">*</span>
          <textarea id="question" name="question" required rows={6}></textarea>
        </label>
        <label for="answer" style={labelStyle}>
          Answer: <span aria-label="required">*</span>
          <textarea id="answer" name="answer" required rows={6}></textarea>
        </label>
        <button type="submit">Flash card</button>
      </form>
    </section>
  );
}
