const KNOWLEDGE_BASE = [
    {
        keywords: ['research', 'interests', 'work on', 'topics', 'focus'],
        response: "Reza's research is at the intersection of AI, Optimization, and Large-scale Data Analytics. Key topics include Green AI, Explainable AI (XAI), Graph Neural Networks, and Cyber Security for critical infrastructures."
    },
    {
        keywords: ['education', 'study', 'degree', 'phd', 'university', 'graduated'],
        response: "Reza has two PhDs: Computer Science (Univ. of Calabria, 2019) and Telecommunications (Shahid Beheshti Univ., 2016). He also holds a Master's and Bachelor's in Electrical Engineering from IUST, where he was ranked as an Elite Student."
    },
    {
        keywords: ['position', 'job', 'current', 'where', 'professor'],
        response: "Reza is currently an Assistant Professor (Tenure Track) at the University of Palermo. He also holds the Italian National Scientific Qualification (ASN) as an Associate Professor in Computer Engineering."
    },
    {
        keywords: ['awards', 'honors', 'best paper', 'senior member'],
        response: "Reza received the Best Paper Award at IEEE CyberSciTech 2025 for 'Green Generative AI'. He is also an IEEE Senior Member (since 2022) and received several recognitions as an Elite student."
    },
    {
        keywords: ['grants', 'funding', 'enfield', 'forthem'],
        response: "Reza has secured several prestigious grants, including the ENFIELD TES-4 mobility grant (2025) and the FORTHEM Lab project grant for 'Green-Aware AI' (2025)."
    },
    {
        keywords: ['patents', 'innovations', 'inventory'],
        response: "Reza holds two patents: a US Patent for a 'Digital mental health ecosystem' (2023) and an Iran Patent for 'Random numbers generator hardware' (2018)."
    },
    {
        keywords: ['publications', 'papers', 'journal', 'articles'],
        response: "Reza has published extensively in journals like 'Expert Systems with Applications', 'Future Generation Computer Systems', and 'BMC Medical Informatics'. He has performed over 250 reviews for 75+ publications."
    },
    {
        keywords: ['teaching', 'courses', 'classes', 'lectures'],
        response: "Reza's teaching includes advanced courses on 'Fundamentals of AI and LLMs' (PhD), 'Intelligent Data Analysis' (Master's), and 'Computer Networks and Webdesign' at the University of Palermo."
    },
    {
        keywords: ['projects', 'solido', 'true detective', 'fair'],
        response: "Key projects include SOLIDO (industrial logistics), True Detective 4.0 (PNRR digital transformation), and the FAIR project (Future AI Research) focused on Green-Aware XAI."
    },
    {
        keywords: ['hello', 'hi', 'who are you', 'introduction', 'bio', 'about'],
        response: "I am 'reza-bio-v1.0', a specialized model fine-tuned on the academic career of Reza Shahbazian. Reza is an Assistant Professor at the University of Palermo, holding dual PhDs in Computer Science and Telecommunications. His work pushes the boundaries of Green AI, Optimization, and Cyber Security. Beyond his research, he is an IEEE Senior Member and a passionate educator. How can I assist you with his profile today?"
    },
    {
        keywords: ['contact', 'email', 'reach'],
        response: "You can reach Reza via email at shahbazian@ieee.org. On the website, you can click the 'Show Email' button to see and copy his address."
    }
];

const chatOutput = document.getElementById('chat-output');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const llmStats = document.getElementById('llm-stats');

// Initial Greeting with typing animation
window.addEventListener('DOMContentLoaded', () => {
    const bioGreeting = "Hello! I am reza-bio-v1.0. I am an Assistant Professor (Tenure Track) at the University of Palermo with dual PhDs in Computer Science and Telecommunications. My research is dedicated to advancing Machine Learning, Optimization, and Cyber Security. How can I help you explore my professional journey today?";
    setTimeout(() => {
        addMessage(bioGreeting, 'ai');
    }, 1000);
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    chatOutput.appendChild(msgDiv);
    
    if (sender === 'ai') {
        typeEffect(msgDiv, text);
    } else {
        msgDiv.textContent = text;
    }
    
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function typeEffect(element, text) {
    let i = 0;
    element.textContent = '';
    
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('cursor');
    element.appendChild(cursorSpan);

    const interval = setInterval(() => {
        if (i < text.length) {
            // Insert text before the cursor
            cursorSpan.insertAdjacentText('beforebegin', text.charAt(i));
            i++;
            chatOutput.scrollTop = chatOutput.scrollHeight;
        } else {
            clearInterval(interval);
            // Optional: remove cursor after typing
            setTimeout(() => cursorSpan.remove(), 2000);
        }
    }, 20);
}

function getResponse(input) {
    const lowerInput = input.toLowerCase();
    for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some(keyword => lowerInput.includes(keyword))) {
            return entry.response;
        }
    }
    return "I'm sorry, I don't have specific information on that. You might find more details in Reza's CV or by contacting him directly at shahbazian@ieee.org.";
}

function handleChat() {
    const input = chatInput.value.trim();
    if (!input) return;

    addMessage(input, 'user');
    chatInput.value = '';

    // Simulate "thinking"
    llmStats.textContent = 'Inference in progress...';
    const startTime = performance.now();

    setTimeout(() => {
        const response = getResponse(input);
        const endTime = performance.now();
        const inferenceTime = ((endTime - startTime) / 1000).toFixed(2);
        const tokens = Math.floor(response.length / 4);
        
        addMessage(response, 'ai');
        llmStats.textContent = `Inference time: ${inferenceTime}s | Tokens: ${tokens}`;
    }, 600 + Math.random() * 1000);
}

sendBtn.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});