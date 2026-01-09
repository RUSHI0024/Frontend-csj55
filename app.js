// Page navigation and animation system
let currentPage = 'index';

function showPage(pageId) {
    // Hide current page
    const currentPageElement = document.getElementById(currentPage + '-page');
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Show new page after a brief delay for smooth transition
    setTimeout(() => {
        const newPageElement = document.getElementById(pageId + '-page');
        if (newPageElement) {
            newPageElement.classList.add('active');
            currentPage = pageId;
            
            // Trigger special effects based on page
            if (pageId === 'yes') {
                setTimeout(() => {
                    startCelebration();
                }, 500);
            }
            
            // Create popup emojis when changing pages
            createPageTransitionEmojis(pageId);
        }
    }, 200);
}

// Background effects system
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💖', '💕', '💗', '❤️', '💝'][Math.floor(Math.random() * 5)];
    
    const startX = Math.random() * window.innerWidth;
    heart.style.left = startX + 'px';
    heart.style.animationDuration = (8 + Math.random() * 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 12000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
    
    const startX = Math.random() * window.innerWidth;
    sparkle.style.left = startX + 'px';
    sparkle.style.animationDuration = (6 + Math.random() * 3) + 's';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    
    document.querySelector('.sparkles').appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 10000);
}

// Emoji popup system
function createPopupEmoji(x, y, emoji) {
    const emojiElement = document.createElement('div');
    emojiElement.className = 'popup-emoji';
    emojiElement.innerHTML = emoji;
    emojiElement.style.left = x + 'px';
    emojiElement.style.top = y + 'px';
    
    document.querySelector('.emoji-container').appendChild(emojiElement);
    
    // Remove emoji after animation
    setTimeout(() => {
        if (emojiElement.parentNode) {
            emojiElement.parentNode.removeChild(emojiElement);
        }
    }, 2000);
}

function createPageTransitionEmojis(pageId) {
    const pageEmojis = {
        'index': ['💓', '❣️', '😍', '❣️'],
        'no1': ['🤔', '💭', '😔', '🙄', '😥', '💔'],
        'no2': ['💔', '🥺'],
        'no3': ['💔'],
        'yes': ['🎉', '💕', '✨', '❤️', '💖', '🥳']
    };
    
    const emojis = pageEmojis[pageId] || ['💕'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            createPopupEmoji(x, y, emoji);
        }, i * 200);
    }
}

// Moving button functionality for final No page
function initializeMovingButton() {
    const movingButton = document.getElementById('moving-no-btn');
    if (!movingButton) return;
    
    let moveCount = 0;
    let isMoving = false;
    
    // Function to move button to random position
    function moveButton() {
        if (isMoving) return;
        isMoving = true;
        
        const container = movingButton.parentElement;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = movingButton.getBoundingClientRect();
        
        // Calculate random position within container bounds
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        const newX = Math.random() * Math.max(maxX, 100);
        const newY = Math.random() * Math.max(maxY, 50);
        
        // Apply transform to move the button
        movingButton.style.transform = `translate(${newX - buttonRect.width/2}px, ${newY - buttonRect.height/2}px)`;
        movingButton.style.transition = 'transform 0.5s ease-out';
        
        moveCount++;
        
        // Create frustrated emojis
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const rect = movingButton.getBoundingClientRect();
                createPopupEmoji(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    ['😤', '😠', '💔', '😭'][Math.floor(Math.random() * 4)]
                );
            }, i * 100);
        }
        
        setTimeout(() => {
            isMoving = false;
        }, 500);
    }
    
    // Add event listeners for moving the button
    movingButton.addEventListener('mouseenter', moveButton);
    movingButton.addEventListener('focus', moveButton);
    
    // Prevent clicking after several moves
    movingButton.addEventListener('click', (e) => {
        if (moveCount > 2) {
            e.preventDefault();
            e.stopPropagation();
            moveButton();
            
            // Show special message after many attempts
            setTimeout(() => {
                createPopupEmoji(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    '😭'
                );
            }, 600);
        }
    });
}

// Celebration effects for Yes page
function startCelebration() {
    // Clear any existing celebration effects first
    const confettiContainer = document.querySelector('.confetti');
    const heartsContainer = document.querySelector('.falling-hearts');
    
    if (confettiContainer) confettiContainer.innerHTML = '';
    if (heartsContainer) heartsContainer.innerHTML = '';
    
    // Start celebration effects
    createConfetti();
    createFallingHearts();
    
    // Create multiple celebration emoji bursts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const celebrationEmojis = ['🎉', '🥳', '💕', '✨', '❤️', '💖', '🎊', '🌟'];
            const emoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
            createPopupEmoji(x, y, emoji);
        }, i * 200);
    }
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    if (!confettiContainer) return;
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            // Random rotation
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }, i * 30);
    }
}

function createFallingHearts() {
    const heartsContainer = document.querySelector('.falling-hearts');
    if (!heartsContainer) return;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'celebration-heart';
            heart.innerHTML = ['💖', '💕', '💗', '❤️', '💝', '💓'][Math.floor(Math.random() * 6)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.animationDelay = Math.random() * 1 + 's';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 6000);
        }, i * 80);
    }
}

// Button hover effects
function addButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            // Skip moving button special handling
            if (button.id === 'moving-no-btn') return;
            
            // Create mini emoji burst on hover
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            let emoji = '✨';
            if (button.classList.contains('btn-yes')) {
                emoji = ['💕', '💖', '❤️'][Math.floor(Math.random() * 3)];
            } else if (button.classList.contains('btn-no')) {
                emoji = ['😔', '💔'][Math.floor(Math.random() * 2)];
            }
            
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 80;
                    const offsetY = (Math.random() - 0.5) * 80;
                    createPopupEmoji(centerX + offsetX, centerY + offsetY, emoji);
                }, i * 150);
            }
        });
    });
}

// Initialize random background effects
function startBackgroundEffects() {
    // Create floating hearts periodically
    setInterval(createFloatingHeart, 2000);
    
    // Create sparkles periodically
    setInterval(createSparkle, 3000);
    
    // Create initial hearts and sparkles
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 500);
        setTimeout(createSparkle, i * 700 + 1000);
    }
}

// Add click effects to the page
function addClickEffects() {
    document.addEventListener('click', (e) => {
        // Don't create effects on button clicks
        if (e.target.classList.contains('btn')) return;
        
        const clickEmojis = ['💫', '✨', '⭐', '🌟'];
        const emoji = clickEmojis[Math.floor(Math.random() * clickEmojis.length)];
        createPopupEmoji(e.clientX, e.clientY, emoji);
    });
}

// Text animation effects
function addTextEffects() {
    const titles = document.querySelectorAll('.main-title');
    
    titles.forEach(title => {
        // Add a subtle glow effect that pulses
        title.addEventListener('mouseenter', () => {
            title.style.textShadow = '0 0 20px rgba(255, 107, 157, 0.8), 2px 2px 4px rgba(255, 105, 180, 0.3)';
        });
        
        title.addEventListener('mouseleave', () => {
            title.style.textShadow = '2px 2px 4px rgba(255, 105, 180, 0.3)';
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start background effects
    startBackgroundEffects();
    
    // Initialize moving button after a delay to ensure DOM is ready
    setTimeout(() => {
        initializeMovingButton();
    }, 1000);
    
    // Add interactive effects
    addButtonHoverEffects();
    addClickEffects();
    addTextEffects();
    
    // Create initial page load effect
    setTimeout(() => {
        createPageTransitionEmojis('index');
    }, 1000);
    
    // Add some initial sparkle to make it feel magical immediately
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createPopupEmoji(x, y, '✨');
        }, i * 200);
    }
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn')) {
            focusedElement.click();
        }
    }
});

// Handle window resize to adjust effects
window.addEventListener('resize', () => {
    // Reset moving button position
    const movingButton = document.getElementById('moving-no-btn');
    if (movingButton) {
        movingButton.style.transform = '';
    }
});

// Add extra magical touches
function createRandomMagicalEffects() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const magicalEmojis = ['✨', '🌟', '💫', '⭐'];
            const emoji = magicalEmojis[Math.floor(Math.random() * magicalEmojis.length)];
            createPopupEmoji(x, y, emoji);
        }
    }, 5000);
}

// Start magical effects after a delay
setTimeout(createRandomMagicalEffects, 3000);