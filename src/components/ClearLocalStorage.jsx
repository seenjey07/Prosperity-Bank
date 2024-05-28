const ClearLocalStorageButton = () => {
  const handleClearLocalStorage = () => {
    localStorage.clear();
    alert("Local Storage has been cleared.");
  };

  return <button onClick={handleClearLocalStorage}>Clear Local Storage</button>;
};

export default ClearLocalStorageButton;
