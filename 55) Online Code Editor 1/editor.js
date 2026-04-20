document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const runButton = document.getElementById('run-button');
    const codeInput = document.getElementById('code-input'); // Or your editor instance
    const outputArea = document.getElementById('output-area');
    const textOutput = document.getElementById('text-output');
    const htmlPreview = document.getElementById('html-preview');
    const statusIndicator = document.getElementById('status-indicator');

    // --- If using Ace/CodeMirror/Monaco, initialize it here ---
    // Example (Conceptual for Ace):
    // const editor = ace.edit("code-input"); // Assuming code-input is now a div
    // editor.setTheme("ace/theme/monokai");
    // editor.session.setMode("ace/mode/javascript");
    // languageSelect.addEventListener('change', () => {
    //    editor.session.setMode("ace/mode/" + languageSelect.value);
    // });
    // function getCode() { return editor.getValue(); }
    // function setCode(code) { editor.setValue(code, -1); }

    // Fallback for plain textarea:
    function getCode() { return codeInput.value; }
    function setCode(code) { codeInput.value = code; }
    // -----------------------------------------------------------


    runButton.addEventListener('click', () => {
        const language = languageSelect.value;
        const code = getCode(); // Use editor's method if applicable

        // Clear previous output and prepare UI
        clearOutput();
        statusIndicator.textContent = 'Running...';
        runButton.disabled = true;

        // --- Client-side languages ---
        if (language === 'javascript') {
            executeJavaScript(code);
            resetUI();
        } else if (language === 'html') {
            renderHTML(code);
            resetUI();
        } else if (language === 'css') {
            previewCSS(code);
            resetUI();
        }
        // --- Backend languages ---
        else {
            executeOnBackend(language, code);
        }
    });

    function clearOutput() {
        textOutput.textContent = '';
        htmlPreview.srcdoc = '';
        outputArea.className = '';
        textOutput.style.display = 'none';
        htmlPreview.style.display = 'none';
    }

    function resetUI() {
         statusIndicator.textContent = 'Ready';
         runButton.disabled = false;
    }

    function displayOutput(text) {
        clearOutput();
        outputArea.className = 'show-text';
        textOutput.style.display = 'block';
        textOutput.textContent = text;
    }

    async function executeOnBackend(language, code) {
        // Replace with your actual backend endpoint
        const BACKEND_URL = '/api/execute'; // Or 'https://your-backend-domain.com/execute'

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: language,
                    code: code,
                    // You might also send stdin if your editor supports it
                }),
            });

            if (!response.ok) {
                // Handle HTTP errors (e.g., 404, 500)
                const errorText = await response.text();
                throw new Error(`Backend error ${response.status}: ${errorText || response.statusText}`);
            }

            const result = await response.json();

            // Assuming backend returns { output: "...", error: "..." }
            let outputText = '';
            if (result.output) {
                outputText += result.output;
            }
            if (result.error) {
                // Prepend error label for clarity
                outputText += (outputText ? '\n---\nError:\n' : 'Error:\n') + result.error;
            }
             if (!result.output && !result.error) {
                 outputText = '// Execution finished with no output or error.';
             }

            displayOutput(outputText);

        } catch (error) {
            console.error("Error executing code on backend:", error);
            displayOutput(`Network or Execution Error:\n${error.message}`);
        } finally {
            resetUI(); // Re-enable button, reset status
        }
    }

    // --- executeJavaScript, renderHTML, previewCSS functions remain similar ---
    // (Include functions from the previous answer: executeJavaScript, formatArg, renderHTML, previewCSS)

    function executeJavaScript(code) {
        outputArea.className = 'show-text'; // Show text output area
        textOutput.style.display = 'block';
        try {
            const oldLog = console.log;
            let logs = [];
            console.log = (...args) => {
                logs.push(args.map(arg => formatArg(arg)).join(' '));
            };
            const result = new Function(code)();
            console.log = oldLog; // Restore

            textOutput.textContent = logs.join('\n');
             if (result !== undefined) {
                textOutput.textContent += (logs.length > 0 ? '\n' : '') + 'Return value: ' + formatArg(result);
            }
             if (textOutput.textContent === '') {
                 textOutput.textContent = '// Code executed successfully. No output or return value.';
            }
        } catch (error) {
            console.log = console.error;
            textOutput.textContent = `Error: ${error}`;
        }
    }

    function formatArg(arg) { /* ... same as before ... */
        if (typeof arg === 'string') { return arg; }
        if (typeof arg === 'object' && arg !== null) {
            try { return JSON.stringify(arg, null, 2); } catch (e) { return arg.toString(); }
        }
        return String(arg);
    }

    function renderHTML(code) {
         outputArea.className = 'show-iframe';
         htmlPreview.style.display = 'block';
         htmlPreview.srcdoc = code;
    }

     function previewCSS(code) {
         outputArea.className = 'show-iframe';
         htmlPreview.style.display = 'block';
         htmlPreview.srcdoc = `<!DOCTYPE html><html><head><style>${code}</style></head><body><h1>CSS Preview</h1><p>Your styles are applied.</p><div>A div</div><button>A Button</button></body></html>`;
    }


    // --- Initial setup ---
    setCode(`// Select a language and run!\n\n// Example for Python (requires backend)\n/*\ndef greet(name):\n  print(f"Hello, {name} from Python!")\n\ngreet("User")\n*/\n\n// Example for C++ (requires backend)\n/*\n#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}\n*/\n`)
    languageSelect.value = 'javascript'; // Default
});