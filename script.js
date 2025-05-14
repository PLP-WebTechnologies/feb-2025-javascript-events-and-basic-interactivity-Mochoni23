document.addEventListener('DOMContentLoaded', () => {
    // 1. Event Handling
    document.getElementById('flavorButton').addEventListener('click', function () {
        alert('Let us help you find your perfect dream flavor! Visit our flavors section to explore.');
    });

    const secretButton = document.getElementById('secretButton');
    const secretMessage = document.getElementById('secretMessage');
    let pressTimer;

    secretButton.addEventListener('dblclick', showSecret);
    document.getElementById('secretNav').addEventListener('click', showSecret);

    secretButton.addEventListener('mousedown', function () {
        pressTimer = setTimeout(showSecret, 1000); // 1 second long press
    });

    secretButton.addEventListener('mouseup', function () {
        clearTimeout(pressTimer);
    });

    secretButton.addEventListener('mouseleave', function () {
        clearTimeout(pressTimer);
    });

    secretButton.addEventListener('click', () => {
        if (secretMessage) {
            secretMessage.style.display = 'block'; // Show the secret menu
        }
    });

    function showSecret() {
        if (secretMessage) {
            secretMessage.style.display = 'block';
            createConfetti();
        }
    }

    function hideSecret() {
        if (secretMessage) {
            secretMessage.style.display = 'none'; // Hide the secret menu
        }
    }

    const keepItSecretButton = secretMessage.querySelector('button');
    if (keepItSecretButton) {
        keepItSecretButton.addEventListener('click', hideSecret);
    }

    // 2. Interactive Elements
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    let colorIndex = 0;

    document.getElementById('colorChanger').addEventListener('click', function () {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.style.borderColor = colors[(colorIndex + 2) % colors.length];

        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });

    // Image gallery
    function changeFlavor(img) {
        const featuredFlavor = document.getElementById('featuredFlavor');
        if (featuredFlavor) {
            featuredFlavor.src = img.src;
            featuredFlavor.alt = img.alt;

            img.style.transform = 'scale(0.9) rotate(-5deg)';
            setTimeout(() => {
                img.style.transform = 'scale(1.1) rotate(0deg)';
            }, 100);
        }
    }

    // Tabs
    function openTab(event, tabName) {
        // Hide all tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));

        // Remove active class from all tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));

        // Show the selected tab content
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Add active class to the clicked tab button
        event.currentTarget.classList.add('active');
    }

    // Attach the `openTab` function to the global scope so it can be called from the HTML
    window.openTab = openTab;

    // Accordion
    function toggleAccordion(header) {
        // Get the content element next to the clicked header
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');

        // Check if the content is already open
        const isOpen = content.style.maxHeight;

        // Close all other accordion items
        const allContents = document.querySelectorAll('.faq-content');
        const allIcons = document.querySelectorAll('.faq-header i');
        allContents.forEach(item => {
            item.style.maxHeight = null; // Collapse all contents
        });
        allIcons.forEach(i => {
            i.classList.remove('fa-chevron-up');
            i.classList.add('fa-chevron-down'); // Reset all icons
        });

        // Toggle the clicked accordion item
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px'; // Expand the content
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up'); // Change the icon to "up"
        }
    }

    // Attach the toggleAccordion function to the global scope
    window.toggleAccordion = toggleAccordion;

    // Form Validation
    function validateName(input) {
        const errorElement = document.getElementById('nameError');
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorElement.style.display = 'block';
            return false;
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateEmail(input) {
        const errorElement = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (input.value.trim() === '' || emailRegex.test(input.value)) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            errorElement.style.display = 'none';
            return true;
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorElement.style.display = 'block';
            return false;
        }
    }

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName(document.getElementById('name'));
        const isEmailValid = validateEmail(document.getElementById('email'));

        if (isNameValid && isEmailValid) {
            alert('Thanks for your message! We\'ll get back to you soon with sweet news.');
            this.reset();

            document.querySelectorAll('#contactForm input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        } else {
            alert('Please fix the highlighted errors before submitting.');
        }
    });

    // Bonus: Confetti animation
    function createConfetti() {
        const flavors = ['🍦', '🍨', '🍧', '🥄', '🌟', '✨'];
        const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = flavors[Math.floor(Math.random() * flavors.length)];
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.fontSize = (20 + Math.random() * 20) + 'px';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = -30 + 'px';
            document.body.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = 3 + Math.random() * 5;
            const rotationSpeed = Math.random() * 10;
            let rotation = 0;

            let posX = parseFloat(confetti.style.left);
            let posY = parseFloat(confetti.style.top);
            let opacity = 1;

            const fall = setInterval(() => {
                posX += Math.cos(angle) * 2;
                posY += velocity;
                rotation += rotationSpeed;
                opacity -= 0.01;

                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = opacity;
                confetti.style.transform = `rotate(${rotation}deg)`;

                if (posY > window.innerHeight || opacity <= 0) {
                    clearInterval(fall);
                    confetti.remove();
                }
            }, 30);
        }
    }
});