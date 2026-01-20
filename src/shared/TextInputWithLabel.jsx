function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        id={elementId}
        type="text"
        ref={ref}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}

export default TextInputWithLabel;
