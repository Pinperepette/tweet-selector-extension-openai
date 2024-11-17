console.log("Script content.js loaded successfully on X.com");

// Array to store selected tweet texts
let selectedTexts = [];

// Variable to track if the sidebar is visible or hidden
let sidebarVisible = true;

// Function to create the sidebar with settings
function createSidebar() {
    if (document.querySelector('.sidebar-selected-texts')) return;

    // Button to hide/show the sidebar
    const toggleSidebarButton = document.createElement('button');
    toggleSidebarButton.innerHTML = '⬅️'; // Use a left arrow icon
    toggleSidebarButton.style.position = 'fixed';
    toggleSidebarButton.style.left = '20px'; // Position on the left
    toggleSidebarButton.style.top = '20px';
    toggleSidebarButton.style.zIndex = '1001';
    toggleSidebarButton.style.padding = '8px';
    toggleSidebarButton.style.backgroundColor = 'transparent'; // Make the background transparent
    toggleSidebarButton.style.color = '#333';
    toggleSidebarButton.style.border = 'none';
    toggleSidebarButton.style.borderRadius = '5px';
    toggleSidebarButton.style.cursor = 'pointer';
    toggleSidebarButton.style.fontWeight = 'bold';
    document.body.appendChild(toggleSidebarButton);

    // Sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar-selected-texts';
    sidebar.style.position = 'fixed';
    sidebar.style.right = '20px';
    sidebar.style.top = '20px';
    sidebar.style.width = '320px';
    sidebar.style.height = 'calc(100% - 40px)';
    sidebar.style.backgroundColor = '#ffffff';
    sidebar.style.borderRadius = '10px';
    sidebar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    sidebar.style.overflowY = 'auto';
    sidebar.style.padding = '20px';
    sidebar.style.zIndex = '1000';
    sidebar.style.fontFamily = 'Arial, sans-serif';
    sidebar.style.color = '#333';

    const title = document.createElement('h3');
    title.innerText = 'Selected Texts';
    title.style.marginBottom = '15px';
    title.style.color = '#0077cc';
    title.style.fontWeight = 'bold';
    sidebar.appendChild(title);

    // Container for selected texts
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    textContainer.style.maxHeight = '400px';
    textContainer.style.overflowY = 'auto';
    textContainer.style.marginBottom = '20px';
    sidebar.appendChild(textContainer);

    // Section for API settings
    const settingsTitle = document.createElement('h4');
    settingsTitle.innerText = 'API Settings';
    settingsTitle.style.marginTop = '20px';
    settingsTitle.style.marginBottom = '10px';
    settingsTitle.style.color = '#0077cc';
    settingsTitle.style.fontWeight = 'bold';
    sidebar.appendChild(settingsTitle);

    // Button to toggle the API key section
    const toggleButton = document.createElement('button');
    toggleButton.innerText = 'Show API Key';
    toggleButton.style.width = '100%';
    toggleButton.style.padding = '8px';
    toggleButton.style.backgroundColor = '#0077cc';
    toggleButton.style.color = '#fff';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontWeight = 'bold';
    toggleButton.style.marginBottom = '10px';
    sidebar.appendChild(toggleButton);

    // API key section, hidden by default
    const apiSection = document.createElement('div');
    apiSection.style.display = 'none';
    apiSection.style.marginBottom = '20px';

    // Input for API key
    const apiKeyInput = document.createElement('input');
    apiKeyInput.type = 'password'; // Hide the key
    apiKeyInput.placeholder = 'Enter API Key';
    apiKeyInput.style.width = '100%';
    apiKeyInput.style.padding = '8px';
    apiKeyInput.style.border = '1px solid #ddd';
    apiKeyInput.style.borderRadius = '5px';
    apiKeyInput.style.marginBottom = '10px';
    apiKeyInput.value = localStorage.getItem('chatgpt_api_key') || '';
    apiSection.appendChild(apiKeyInput);

    // Button to reveal/hide the API key
    const revealButton = document.createElement('button');
    revealButton.innerText = 'Show';
    revealButton.style.marginBottom = '10px';
    revealButton.style.padding = '5px';
    revealButton.style.border = 'none';
    revealButton.style.borderRadius = '5px';
    revealButton.style.backgroundColor = '#ddd';
    revealButton.style.cursor = 'pointer';
    revealButton.onclick = () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            revealButton.innerText = 'Hide';
        } else {
            apiKeyInput.type = 'password';
            revealButton.innerText = 'Show';
        }
    };
    apiSection.appendChild(revealButton);

    // Input for the prompt
    const promptInput = document.createElement('textarea');
    promptInput.placeholder = 'Enter the prompt';
    promptInput.style.width = '100%';
    promptInput.style.height = '80px';
    promptInput.style.padding = '8px';
    promptInput.style.border = '1px solid #ddd';
    promptInput.style.borderRadius = '5px';
    promptInput.style.marginBottom = '10px';
    promptInput.value = localStorage.getItem('chatgpt_prompt') || '';
    apiSection.appendChild(promptInput);

    // Button to save settings
    const saveSettingsBtn = document.createElement('button');
    saveSettingsBtn.innerText = 'Save Settings';
    saveSettingsBtn.style.width = '100%';
    saveSettingsBtn.style.padding = '10px';
    saveSettingsBtn.style.backgroundColor = '#0077cc';
    saveSettingsBtn.style.color = '#fff';
    saveSettingsBtn.style.border = 'none';
    saveSettingsBtn.style.borderRadius = '5px';
    saveSettingsBtn.style.cursor = 'pointer';
    saveSettingsBtn.style.fontWeight = 'bold';
    saveSettingsBtn.style.marginTop = '10px';
    saveSettingsBtn.onclick = () => {
        localStorage.setItem('chatgpt_api_key', apiKeyInput.value);
        localStorage.setItem('chatgpt_prompt', promptInput.value);
        alert('Settings saved!');
    };
    apiSection.appendChild(saveSettingsBtn);

    // Add the API section to the container
    sidebar.appendChild(apiSection);

    // Function to toggle the API key section
    toggleButton.onclick = () => {
        if (apiSection.style.display === 'none') {
            apiSection.style.display = 'block';
            toggleButton.innerText = 'Hide API Key';
        } else {
            apiSection.style.display = 'none';
            toggleButton.innerText = 'Show API Key';
        }
    };

    // Button to send texts to ChatGPT
    const generateOutputBtn = document.createElement('button');
    generateOutputBtn.innerText = 'Generate Output with ChatGPT';
    generateOutputBtn.style.width = '100%';
    generateOutputBtn.style.padding = '10px';
    generateOutputBtn.style.backgroundColor = '#28a745';
    generateOutputBtn.style.color = '#fff';
    generateOutputBtn.style.border = 'none';
    generateOutputBtn.style.borderRadius = '5px';
    generateOutputBtn.style.cursor = 'pointer';
    generateOutputBtn.style.fontWeight = 'bold';
    generateOutputBtn.style.marginTop = '10px';
    generateOutputBtn.onclick = sendTextsToChatGPT;
    sidebar.appendChild(generateOutputBtn);

    // Add the sidebar to the body of the page
    document.body.appendChild(sidebar);

    // Function to hide/show the sidebar
    toggleSidebarButton.onclick = () => {
        if (sidebarVisible) {
            sidebar.style.display = 'none';
            toggleSidebarButton.innerHTML = '➡️'; // Change to a right arrow icon
            sidebarVisible = false;
        } else {
            sidebar.style.display = 'block';
            toggleSidebarButton.innerHTML = '⬅️'; // Change back to a left arrow icon
            sidebarVisible = true;
        }
    };
}

// Function to update the texts in the sidebar
function updateSidebar() {
    const textContainer = document.querySelector('.text-container');
    if (!textContainer) return;
    textContainer.innerHTML = '';

    selectedTexts.forEach(text => {
        const paragraph = document.createElement('p');
        paragraph.innerText = text;
        paragraph.style.marginBottom = '10px';
        paragraph.style.padding = '10px';
        paragraph.style.backgroundColor = '#f1f1f1';
        paragraph.style.borderRadius = '5px';
        paragraph.style.border = '1px solid #ddd';
        textContainer.appendChild(paragraph);
    });
}

// Function to send the selected texts to ChatGPT
async function sendTextsToChatGPT() {
    const apiKey = localStorage.getItem('chatgpt_api_key');
    const prompt = localStorage.getItem('chatgpt_prompt') || 'Create an article based on these texts:';

    if (!apiKey) {
        alert('Please enter your API key!');
        return;
    }

    const inputTexts = selectedTexts.join('\n\n');
    const request = {
        model: 'gpt-4',
        messages: [{ role: 'user', content: `${prompt}\n\n${inputTexts}` }],
        max_tokens: 1500,
        temperature: 0.7,
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Request error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            alert(`Generated output: ${data.choices[0].message.content}`);
        } else {
            alert('Error in API response');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
}

// Function to add the "Select" icon to tweets
function addIconToTweets() {
    const tweets = document.querySelectorAll('article div[lang]');

    tweets.forEach(tweet => {
        const iconContainer = tweet.closest('article').querySelector('[role="group"]');

        if (iconContainer && !iconContainer.querySelector('.select-icon')) {
            const icon = document.createElement('img');
            icon.className = 'select-icon';
            icon.src = browser.runtime.getURL('icon-select.png');
            icon.alt = 'Select';
            icon.style.cursor = 'pointer';
            icon.style.width = '20px';
            icon.style.height = '20px';
            icon.style.objectFit = 'cover';
            icon.style.marginLeft = '10px';
            icon.style.verticalAlign = 'middle';

            icon.addEventListener('click', (event) => {
                event.stopPropagation();
                const tweetText = tweet.innerText.trim();

                if (selectedTexts.includes(tweetText)) {
                    selectedTexts = selectedTexts.filter(text => text !== tweetText);
                    icon.src = browser.runtime.getURL('icon-select.png');
                    tweet.style.backgroundColor = '';
                } else {
                    selectedTexts.push(tweetText);
                    icon.src = browser.runtime.getURL('icon-selected.png');
                    tweet.style.backgroundColor = '#d1ecf1';
                }

                updateSidebar();
            });

            iconContainer.appendChild(icon);
        }
    });
}

// Create the sidebar on load
createSidebar();

// Use a MutationObserver to monitor DOM changes
const observer = new MutationObserver(addIconToTweets);
observer.observe(document.body, { childList: true, subtree: true });

// Run the function initially to add icons to already loaded tweets
addIconToTweets();
