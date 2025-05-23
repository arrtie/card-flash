/** @format */

interface DataConverterProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function DataConverter({ handleSubmit }: DataConverterProps) {
  return (
    <article>
      <h2>Converter</h2>
      <form
        onSubmit={handleSubmit}
        name="data_submission"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <label htmlFor="userInput">
          User input: <span aria-label="required">*</span>
        </label>
        <textarea id="userInput" name="userInput" required rows={10}></textarea>
        <button type="submit">Submit</button>
      </form>
    </article>
  );
}
