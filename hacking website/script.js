document.addEventListener('DOMContentLoaded', () => {

    // --- Basic Setup (Mobile Menu, Footer Year, Matrix) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas?.getContext('2d');
    let matrixInterval;
    function setupMatrix() { /* ... Matrix code remains the same ... */
        if (!canvas || !ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const letters = 'SYSTEMFAILURE01010101АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#39FF14';
            ctx.font = fontSize + 'px Source Code Pro, monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 45); // Adjusted speed slightly
    }
    setupMatrix();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupMatrix, 250);
    });


    // --- Hero Typing Effect ---
    const typingElement = document.getElementById('typing-effect');
    const words = [ /* ... Words remain the same or update as desired ... */
        "Firewall Breached...",
        "Root Access Acquired...",
        "Evading Detection Systems...",
        "Data Exfiltration in Progress...",
        "SYSTEM COMPROMISED."
    ];
    let wordIndex = 0, letterIndex = 0, isDeleting = false;
    const typeSpeed = 80, deleteSpeed = 40, delayBetweenWords = 1500;
    function typeHero() { /* ... Typing effect logic remains the same ... */
        if (!typingElement) return;
        const currentWord = words[wordIndex];
        const currentText = currentWord.substring(0, letterIndex);
        typingElement.textContent = currentText;
        if (!isDeleting && letterIndex < currentWord.length) { letterIndex++; setTimeout(typeHero, typeSpeed); }
        else if (isDeleting && letterIndex > 0) { letterIndex--; setTimeout(typeHero, deleteSpeed); }
        else { isDeleting = !isDeleting; if (!isDeleting) { wordIndex = (wordIndex + 1) % words.length; } setTimeout(typeHero, delayBetweenWords); }
    }
    if (typingElement) setTimeout(typeHero, 500);

    // --- Dashboard: System Status Panel ---
    const cpuLoadEl = document.getElementById('cpu-load');
    const ramUsageEl = document.getElementById('ram-usage');
    const netIoEl = document.getElementById('net-io');
    const uptimeEl = document.getElementById('uptime');
    const threatsEl = document.getElementById('threats');
    let startTime = Date.now();
    let threatCount = 0;

    function updateStatus() {
        if (cpuLoadEl) cpuLoadEl.textContent = `${(Math.random() * 60 + 30).toFixed(1)}%`; // Simulate 30-90% load
        if (ramUsageEl) ramUsageEl.textContent = `${(Math.random() * 50 + 40).toFixed(1)}%`; // Simulate 40-90% RAM
        if (netIoEl) netIoEl.textContent = `${(Math.random() * 1500 + 200).toFixed(0)} KB/s`; // Simulate network traffic
        if (threatsEl) threatsEl.textContent = threatCount; // Update detected threats

        // Uptime calculation
        const now = Date.now();
        const diff = now - startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        if (uptimeEl) uptimeEl.textContent = `${String(hours).padStart(2,'0')}h ${String(minutes).padStart(2,'0')}m ${String(seconds).padStart(2,'0')}s`;

        // Randomly increase threat count sometimes
        if (Math.random() < 0.02) { // 2% chance per interval
            threatCount++;
        }
    }
    setInterval(updateStatus, 1500); // Update status every 1.5 seconds
    updateStatus(); // Initial call

    // --- Dashboard: Network Traffic Log ---
    const networkLogEl = document.getElementById('network-log');
    const maxLogLines = 50; // Limit lines to prevent performance issues

    function addLogEntry() {
        if (!networkLogEl) return;
        const srcIp = `1${Math.floor(Math.random()*99)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*254 + 1)}`;
        const destIp = (Math.random() > 0.3) ? '10.0.0.5' : `192.168.1.${Math.floor(Math.random()*100 + 1)}`; // More traffic to 'our' server
        const srcPort = Math.floor(Math.random() * 64512 + 1024);
        const destPort = [22, 80, 443, 3306, 53, Math.floor(Math.random()*60000 + 1024)][Math.floor(Math.random()*6)];
        const protocol = ['TCP', 'UDP', 'ICMP'][Math.floor(Math.random()*3)];
        const action = ['ALLOW', 'DENY', 'ALERT'][Math.floor(Math.random()*3)];
        const timestamp = new Date().toLocaleTimeString();
        const directionClass = destIp === '10.0.0.5' ? 'inbound' : 'outbound';
        const actionColor = action === 'DENY' ? 'text-red-500' : (action === 'ALERT' ? 'text-yellow-400' : '');

        const logLine = document.createElement('p');
        logLine.className = directionClass;
        logLine.innerHTML = `[${timestamp}] ${protocol} ${srcIp}:${srcPort} -> ${destIp}:${destPort} <span class="${actionColor}">${action}</span>`;

        networkLogEl.appendChild(logLine);

        // Scroll effect (keep bottom visible) & limit lines
        networkLogEl.scrollTop = networkLogEl.scrollHeight;
        if (networkLogEl.children.length > maxLogLines) {
             // Remove oldest lines efficiently (check if first child is NOT the fade div)
             if (networkLogEl.firstElementChild && networkLogEl.firstElementChild.tagName === 'P') {
                networkLogEl.removeChild(networkLogEl.firstElementChild);
             }
        }
    }
    setInterval(addLogEntry, 75); // Add new log entry very fast (adjust speed)

    // --- Dashboard: Progress Bars ---
    const progressBarsContainer = document.getElementById('progress-bars');
    let progressBarIdCounter = 0;

    function createProgressBar(label = "Processing...", duration = 5000) {
        if (!progressBarsContainer) return;

        // Clear the initial "No active processes" message if present
        const initialMsg = progressBarsContainer.querySelector('p.text-gray-500');
        if (initialMsg) initialMsg.remove();

        const barId = `progress-${progressBarIdCounter++}`;
        const container = document.createElement('div');
        container.id = barId;
        container.className = 'progress-bar-item mb-2';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'text-xs text-gray-400 block mb-1';
        labelSpan.textContent = label;

        const barContainer = document.createElement('div');
        barContainer.className = 'progress-bar-container';

        const barFill = document.createElement('div');
        barFill.className = 'progress-bar-fill';
        barFill.textContent = '0%'; // Initial text

        barContainer.appendChild(barFill);
        container.appendChild(labelSpan);
        container.appendChild(barContainer);
        progressBarsContainer.appendChild(container);

        let progress = 0;
        const intervalTime = 50; // Update frequency
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const interval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                barFill.style.width = `${progress}%`;
                barFill.textContent = 'Complete!';
                clearInterval(interval);
                // Optional: Remove the bar after a delay
                setTimeout(() => container.remove(), 2000);
            } else {
                barFill.style.width = `${progress}%`;
                barFill.textContent = `${Math.floor(progress)}%`;
            }
        }, intervalTime);

        return barId; // Return ID if needed to manually stop/remove
    }

    // Example: createProgressBar("Analyzing network...", 7000); // Called by terminal commands later

    // --- Dashboard: Fake File Explorer ---
    const fileExplorerEl = document.getElementById('file-explorer');
    const fakeFileSystem = {
        '/': {
            type: 'folder',
            children: {
                'bin': { type: 'folder', children: {'bash': {type: 'file', content: '#!/bin/bash\necho "Shell access"'}} },
                'etc': { type: 'folder', children: {
                    'passwd': {type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:...'},
                    'shadow': {type: 'file', content: 'root:$6$xyz$...:18638:0:99999:7:::'},
                    'ssh': { type: 'folder', children: {'sshd_config': {type: 'file', content: '# SSH Config\nPort 22\nPermitRootLogin no'}} }
                }},
                'home': { type: 'folder', children: {
                    'operator': { type: 'folder', children: {
                        '.bashrc': {type: 'file', content: 'alias ll="ls -alF"'},
                        'tools': { type: 'folder', children: { 'scanner.py': {type: 'file', content: '# Network Scanner v1.0\nimport socket'}}},
                        'notes.txt': {type: 'file', content: 'Target IP: 192.168.1.10\nVulnerability: Outdated web server'}
                    }}
                }},
                'root': { type: 'folder', children: {
                    '.secret_key': {type: 'file', content: '---BEGIN RSA PRIVATE KEY---\n... (data) ...\n---END RSA PRIVATE KEY---'},
                    'payload.exe': {type: 'file', content: 'MZ...........'}
                }},
                'var': { type: 'folder', children: {
                    'log': { type: 'folder', children: {'syslog': {type: 'file', content: '...\nkernel: Booting up\n...'}, 'auth.log': {type: 'file', content: '...\nsshd[1234]: Accepted publickey for operator\n...'}} }
                }}
            }
        }
    };

    function renderFileSystem(node, element, path = '/') {
        element.innerHTML = ''; // Clear current view
        const ul = document.createElement('ul');

        Object.entries(node.children).forEach(([name, item]) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = name;
            li.appendChild(span);

            const currentPath = path === '/' ? `/${name}` : `${path}/${name}`;
            li.dataset.path = currentPath; // Store path for commands

            if (item.type === 'folder') {
                li.classList.add('folder');
                const subUl = document.createElement('ul');
                li.appendChild(subUl); // Add ul for potential children

                span.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    li.classList.toggle('open');
                    if (li.classList.contains('open')) {
                        // Render children only when opened
                        renderFileSystem(item, subUl, currentPath);
                    } else {
                        // Clear children when closed (optional, saves rendering)
                         subUl.innerHTML = '';
                    }
                });
            } else {
                li.classList.add('file');
                 // Add click listener for files to simulate 'cat' in terminal (optional)
                 span.addEventListener('click', (e) => {
                      e.stopPropagation();
                      simulateCommand(`cat ${currentPath}`);
                 });
            }
            ul.appendChild(li);
        });
        element.appendChild(ul);
    }

    // Initial render of the root directory
    if (fileExplorerEl) {
         const rootContainer = document.createElement('div'); // Container for the root
         fileExplorerEl.appendChild(rootContainer);
         renderFileSystem(fakeFileSystem['/'], rootContainer, '/');
         // Manually open the first level for better initial view
         const rootUL = rootContainer.querySelector('ul');
         if(rootUL) {
             rootUL.querySelectorAll(':scope > li.folder').forEach(folderLi => {
                 folderLi.classList.add('open');
                 const folderName = folderLi.dataset.path.substring(1); // Get name like 'bin', 'etc'
                 const subUl = folderLi.querySelector('ul');
                 if(subUl && fakeFileSystem['/'].children[folderName]) {
                     renderFileSystem(fakeFileSystem['/'].children[folderName], subUl, folderLi.dataset.path);
                 }
             });
         }
    }


    // --- Enhanced Simulated Terminal ---
    const terminalOutput = document.getElementById('terminal-output');
    let currentDirectory = '/'; // Start at root
    let currentInput = "";
    let commandHistory = [];
    let historyIndex = -1;
    let terminalInputLine; // Will hold the current input line div

    function createInputLine() {
        if (terminalInputLine) terminalInputLine.remove(); // Remove old one if exists

        terminalInputLine = document.createElement('div');
        terminalInputLine.id = 'terminal-input-line';
        const promptSpan = document.createElement('span');
        promptSpan.className = 'text-white'; // Style prompt differently if needed
        promptSpan.textContent = `operator@overload:${currentDirectory}$ `; // Dynamic prompt

        const inputSpan = document.createElement('span');
        inputSpan.id = 'terminal-input';
        inputSpan.className = 'outline-none'; // Tailwind class for no focus outline
        inputSpan.setAttribute('contenteditable', 'false'); // Not directly editable

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'terminal-cursor';
        cursorSpan.innerHTML = '█';

        terminalInputLine.appendChild(promptSpan);
        terminalInputLine.appendChild(inputSpan);
        terminalInputLine.appendChild(cursorSpan);
        terminalOutput.appendChild(terminalInputLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll to bottom
        currentInput = ""; // Reset input buffer
         inputSpan.textContent = ""; // Clear visual input
    }


    function appendOutput(lines, className = '') {
        if (!Array.isArray(lines)) lines = [lines];
        lines.forEach(line => {
            const p = document.createElement('p');
            p.innerHTML = line; // Allow HTML for colors etc.
            if (className) p.className = className;
            terminalOutput.insertBefore(p, terminalInputLine);
        });
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function resolvePath(path) {
        let parts = path.split('/').filter(p => p !== '');
        let base = (path.startsWith('/')) ? [] : currentDirectory.split('/').filter(p => p !== '');

        for (const part of parts) {
            if (part === '..') {
                if (base.length > 0) {
                    base.pop();
                }
            } else if (part !== '.') {
                base.push(part);
            }
        }
        const resolved = '/' + base.join('/');
        return resolved;
    }

     function getNodeByPath(path) {
        const resolvedPath = resolvePath(path);
        const parts = resolvedPath.split('/').filter(p => p !== '');
        let node = fakeFileSystem['/'];
        try {
            for (const part of parts) {
                 if (node.type !== 'folder' || !node.children || !node.children[part]) {
                    return null; // Path doesn't exist or not a folder
                 }
                 node = node.children[part];
            }
            return node; // Return the folder or file object
        } catch (e) {
             return null; // Error likely means invalid path segment
        }
    }


    const terminalCommands = {
        'help': () => [
            "Project Overload Shell v3.0 - Available Commands:",
            "  help          - Display this help message",
            "  ls [path]     - List directory contents",
            "  cd <dir>      - Change directory",
            "  cat <file>    - Display file content",
            "  pwd           - Print working directory",
            "  scan <target> - Simulate vulnerability scan",
            "  nmap <ip>     - Simulate Nmap port scan",
            "  creds         - Simulate credential access attempt",
            "  clear         - Clear the terminal screen",
            "  exit          - Terminate session (simulated)",
            "  whoami        - Display current user",
        ],
         'ls': (args) => {
            const path = args || currentDirectory;
            const resolvedPath = resolvePath(path);
            const node = getNodeByPath(resolvedPath);

            if (!node || node.type !== 'folder') {
                return [`<span class='text-red-500'>ls: cannot access '${path}': No such file or directory</span>`];
            }
            const output = [];
            Object.entries(node.children).forEach(([name, item]) => {
                 const color = item.type === 'folder' ? 'text-blue-400' : 'text-gray-300';
                 output.push(`<span class='${color}'>${name}</span>`);
            });
            return output.length > 0 ? output : ['']; // Return empty string if dir is empty
        },
        'cd': (args) => {
            if (!args) return ["cd: missing operand"];
            const targetPath = args;
            const resolvedPath = resolvePath(targetPath);
            const node = getNodeByPath(resolvedPath);

            if (node && node.type === 'folder') {
                 currentDirectory = resolvedPath;
                 createInputLine(); // Recreate input line with new path
                 return []; // No output on successful cd
            } else {
                 return [`<span class='text-red-500'>cd: no such file or directory: ${targetPath}</span>`];
            }
        },
        'cat': (args) => {
             if (!args) return ["cat: missing operand"];
             const filePath = args;
             const node = getNodeByPath(filePath);

             if (node && node.type === 'file') {
                 // Split content by newline and return as array for proper formatting
                 const contentLines = node.content.split('\n');
                 // Add slight styling to make it look like file content
                 return contentLines.map(line => `<span class='text-gray-400'>${line.replace(/</g, "<").replace(/>/g, ">")}</span>`);
             } else if (node && node.type === 'folder') {
                 return [`<span class='text-red-500'>cat: ${filePath}: Is a directory</span>`];
             } else {
                 return [`<span class='text-red-500'>cat: ${filePath}: No such file or directory</span>`];
             }
        },
        'pwd': () => [currentDirectory],
        'clear': () => {
             const lines = terminalOutput.querySelectorAll('p, div:not(#terminal-input-line)');
             lines.forEach(line => line.remove());
             return [];
        },
        'whoami': () => ['operator'],
         'exit': () => {
             appendOutput(['> Session terminated by user.', '> Connection closed.']);
             // Optionally disable further input here
             if(terminalInputLine) terminalInputLine.remove();
             return [];
         },
        'scan': (args) => {
            const target = args || '127.0.0.1';
            createProgressBar(`Scanning ${target} for vulnerabilities...`, 8000); // Longer duration
            threatCount++; // Increment threats when scanning
            return [
                `> Initiating vulnerability scan against ${target}...`,
                `> Using profile: 'aggressive_deep_scan'`,
                `> [INFO] Target appears to be running Linux Kernel 5.x`,
                `> [WARN] Detected open port: 8080 (Possible insecure service)`,
                `> [CRITICAL] Potential RCE vulnerability found: CVE-2024-XXXX (Exploitability: High)`,
                `> Scan complete. See progress bar for details.`
            ];
        },
         'nmap': (args) => {
            const target = args || 'target-network';
            createProgressBar(`Nmap scan on ${target}...`, 5000);
            return [
                 `> Starting Nmap 7.92 ( https://nmap.org ) at ${new Date().toLocaleString()}`,
                 `> Nmap scan report for ${target}`,
                 `> Host is up (0.021s latency).`,
                 `> Not shown: 995 closed tcp ports (reset)`,
                 `> PORT     STATE SERVICE`,
                 `> 22/tcp   open  ssh`,
                 `> 80/tcp   open  http`,
                 `> 443/tcp  open  https`,
                 `> 3306/tcp filtered mysql`,
                 `> 8080/tcp open  http-proxy`,
                 `> Nmap done: 1 IP address (1 host up) scanned in 4.85 seconds`
            ];
        },
        'creds': () => {
             createProgressBar(`Attempting credential dump...`, 6000);
             return [
                 "> Initiating credential harvesting module...",
                 "> Targeting SAM/shadow files...",
                 "...",
                 "<span class='text-red-500'>> ACCESS DENIED. Anti-tampering detected.</span>",
                 "> Module failed. Logging event."
             ];
         },
        'default': (cmd) => [`<span class='text-yellow-400'>command not found: ${cmd}. Type 'help'.</span>`]
    };


    // --- Terminal Input Handling ---
     document.addEventListener('keydown', (e) => {
        const terminalInputSpan = document.getElementById('terminal-input');
        if (!terminalInputSpan) return; // Don't handle input if terminal isn't ready

        // Only process if terminal is focused or no other input has focus
        // This is a basic check, might need refinement for complex pages
        const isTerminalFocused = document.activeElement === document.body || terminalOutput.contains(document.activeElement);

        if (!isTerminalFocused && document.activeElement.tagName !== 'BODY') {
            // console.log("Ignoring keydown, focus is elsewhere:", document.activeElement.tagName);
            return;
        }


        if (e.key === 'Enter') {
            e.preventDefault();
            const fullCmd = currentInput.trim();
            const promptText = terminalInputLine.querySelector('span:first-child').textContent;

            // Display the entered command permanently
            const p = document.createElement('p');
            p.innerHTML = `${promptText}<span class='text-white'>${fullCmd.replace(/</g, "<").replace(/>/g, ">")}</span>`;
            terminalOutput.insertBefore(p, terminalInputLine);

             if (fullCmd) {
                 commandHistory.unshift(fullCmd); // Add to history
                 if (commandHistory.length > 20) commandHistory.pop(); // Limit history size
                 historyIndex = -1; // Reset history index

                 const [cmd, ...args] = fullCmd.split(' ');
                 const commandFunc = terminalCommands[cmd] || terminalCommands['default'];
                 const response = commandFunc(args.join(' '), cmd); // Pass args and command name

                 if (response && response.length > 0) {
                     // Simulate slight delay for realism
                     setTimeout(() => appendOutput(response), Math.random() * 150 + 50);
                 }
                 // Create new input line unless command handled it (like 'cd' or 'exit')
                 if (cmd !== 'cd' && cmd !== 'exit' && cmd !== 'clear') {
                     setTimeout(createInputLine, Math.random() * 150 + 70); // Delay slightly more
                 } else if (cmd === 'clear') {
                     // 'clear' command removes output but we need a new input line
                     setTimeout(createInputLine, 50);
                 }

             } else {
                 // Empty command, just create new input line
                  createInputLine();
             }

        } else if (e.key === 'Backspace') {
            e.preventDefault();
            currentInput = currentInput.slice(0, -1);
            terminalInputSpan.textContent = currentInput;
        } else if (e.key === 'ArrowUp') {
             e.preventDefault();
             if (commandHistory.length > 0) {
                 historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                 currentInput = commandHistory[historyIndex];
                 terminalInputSpan.textContent = currentInput;
             }
         } else if (e.key === 'ArrowDown') {
             e.preventDefault();
             if (historyIndex >= 0) {
                 historyIndex--;
                 currentInput = (historyIndex >= 0) ? commandHistory[historyIndex] : "";
                 terminalInputSpan.textContent = currentInput;
             }
        } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
            // Basic check for printable characters (ignores Ctrl+C etc.)
             e.preventDefault(); // Prevent default only if it's a char we handle
             currentInput += e.key;
             terminalInputSpan.textContent = currentInput;
        } else if (e.key === 'Tab') {
            e.preventDefault(); // Prevent focus change
            // Basic Tab Completion Simulation (very simple)
            const inputParts = currentInput.split(' ');
            const currentWord = inputParts[inputParts.length - 1];
            const command = inputParts[0];
            let possibleCompletions = [];

            if (inputParts.length === 1) { // Completing command name
                possibleCompletions = Object.keys(terminalCommands).filter(c => c.startsWith(currentWord) && c !== 'default');
            } else { // Completing argument (likely path)
                 const node = getNodeByPath(currentDirectory);
                 if (node && node.type === 'folder') {
                     possibleCompletions = Object.keys(node.children).filter(name => name.startsWith(currentWord));
                 }
            }

             if (possibleCompletions.length === 1) {
                 inputParts[inputParts.length - 1] = possibleCompletions[0];
                 currentInput = inputParts.join(' ');
                 // Add space if it was a command or folder completion
                 const completedNode = getNodeByPath(resolvePath(possibleCompletions[0]));
                 if (inputParts.length === 1 || (completedNode && completedNode.type === 'folder')) {
                     currentInput += '/'; // Add slash for folders
                 } else {
                     currentInput += ' '; // Add space for files/commands
                 }

                 terminalInputSpan.textContent = currentInput;
             } else if (possibleCompletions.length > 1) {
                 // Print possible completions
                 appendOutput([possibleCompletions.join('   ')]); // Simple display
             }
        }

        // Ensure cursor is always visible
        terminalInputSpan.parentElement. P
    });

    // Create the initial input line when the page loads
    createInputLine();


    // --- Helper function to simulate running a command ---
    function simulateCommand(commandString) {
        if (!terminalOutput || !terminalInputLine) return; // Ensure terminal is ready

        // Display the command as if typed
        const promptText = terminalInputLine.querySelector('span:first-child').textContent;
        const p = document.createElement('p');
        p.innerHTML = `${promptText}<span class='text-white'>${commandString.replace(/</g, "<").replace(/>/g, ">")}</span>`;
        terminalOutput.insertBefore(p, terminalInputLine);

        // Process the command
        const [cmd, ...args] = commandString.split(' ');
        const commandFunc = terminalCommands[cmd] || terminalCommands['default'];
        const response = commandFunc(args.join(' '), cmd);

        if (response && response.length > 0) {
             setTimeout(() => appendOutput(response), Math.random() * 150 + 50);
        }
         if (cmd !== 'cd' && cmd !== 'exit' && cmd !== 'clear') {
              setTimeout(createInputLine, Math.random() * 150 + 70);
         } else if (cmd === 'clear' || cmd === 'cd') {
             setTimeout(createInputLine, 50);
         }
    }


}); // End DOMContentLoaded