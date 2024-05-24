import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSpecialCharacter, setIncludeSpecialCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordSelector = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let password = "";
    let str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

    if (includeNumber) {
      str += "1234567890";
    }

    if (includeSpecialCharacter) {
      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      password += str[randomIndex];
    }

    setPassword(password);
  }, [length, includeNumber, includeSpecialCharacter]);

  useEffect(() => {
    PasswordGenerator();
  }, [PasswordGenerator]);

  const copyToClipBoard = useCallback(() => {
    passwordSelector.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="container">
      <header>
        <h1>Interactive Password Generator</h1>
      </header>
      <div className="functionality-block">
        <div className="password-block">
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            readOnly
            ref={passwordSelector}
            aria-label="Generated password" //for better accessibility.
          />
          <img
            src="/copy.svg"
            alt="Copy to clipboard"
            onClick={copyToClipBoard}
            role="button"
            aria-label="Copy to clipboard" //for better accessibility.
          />
        </div>
        <div className="length-block">
          <label htmlFor="password-length">Length: {length}</label>
          <input
            type="range"
            name="password-length"
            id="password-length"
            value={length}
            min={8}
            max={20}
            onChange={(e) => setLength(Number(e.target.value))}
            aria-label="Password length" //for better accessibility.
          />
        </div>
        <div className="include-number-block">
          <label htmlFor="includeNum">Include Number</label>
          <input
            type="checkbox"
            name="includeNum"
            id="includeNum"
            checked={includeNumber}
            onChange={() => setIncludeNumber((prev) => !prev)}
            aria-label="Include numbers" //for better accessibility.
          />
        </div>
        <div className="include-special-character-block">
          <label htmlFor="special-character-block">
            Include Special Character
          </label>
          <input
            type="checkbox"
            name="special-character-block"
            id="special-character-block"
            checked={includeSpecialCharacter}
            onChange={() => setIncludeSpecialCharacter((prev) => !prev)}
            aria-label="Include special characters"
          />
        </div>
        <div className="generate-password">
          <button
            onClick={PasswordGenerator}
            aria-label="Generate new password"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
