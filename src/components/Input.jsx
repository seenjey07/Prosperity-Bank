const Input = (props) => {
  const { label, type, list, id, value, onChange } = props;

  return (
    <>
      <label>{label}</label>

      <input
        title={label}
        type={type}
        list={list}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
