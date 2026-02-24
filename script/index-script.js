// ===== CV Download Handler =====
document.addEventListener('DOMContentLoaded', function() {
    const cvDownloadBtn = document.getElementById('cvDownloadBtn');
    
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            const originalClass = this.className;
            
            this.classList.add('downloading');
            this.innerHTML = `
                <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" opacity="0.3"></circle>
                    <circle cx="12" cy="12" r="10" stroke-dasharray="15.7" stroke-dashoffset="0" class="spinner"></circle>
                </svg>
                Downloading...
            `;
            
            // Show success message after a delay
            setTimeout(() => {
                this.classList.remove('downloading');
                this.classList.add('success');
                this.innerHTML = `
                    <svg class="download-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                    </svg>
                    Download Completed!
                `;
                
                // Restore original state after 3 seconds
                setTimeout(() => {
                    this.classList.remove('success');
                    this.innerHTML = originalText;
                }, 3000);
            }, 800);
        });
    }
        // ===== Typing effect for intro paragraph =====
    const introParagraph = document.getElementById('intro-text');
    if (introParagraph) {
        const fullText = introParagraph.textContent.trim();
        introParagraph.textContent = '';
        let idx = 0;
        function typeChar() {
            if (idx < fullText.length) {
                introParagraph.textContent += fullText.charAt(idx);
                idx++;
                setTimeout(typeChar, 50);
            }
        }
        typeChar();
    }
});

// ===== Intersection Observer untuk Animasi =====
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe certificate cards untuk entrance animation
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
});

// ===== Interactive Skills Section Animation =====
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        // Add hover effect dengan particle animation
        item.addEventListener('mouseenter', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.background = 'radial-gradient(circle, rgba(194, 166, 140, 0.5) 0%, transparent 70%)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '0';

            this.appendChild(ripple);

            // Animate ripple
            let size = 0;
            const maxSize = 200;
            const interval = setInterval(() => {
                size += 8;
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = (x - size / 2) + 'px';
                ripple.style.top = (y - size / 2) + 'px';

                if (size >= maxSize) {
                    clearInterval(interval);
                    ripple.remove();
                }
            }, 20);
        });

        // Add tilt effect on mouse move
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `translateY(-8px) scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset tilt on mouse leave
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });

        // Add click animation
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add pulse animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% {
                transform: scale(1.05);
            }
            50% {
                transform: scale(1.15);
            }
            100% {
                transform: scale(1.05);
            }
        }

        @keyframes iconPulse {
            0% {
                transform: scale(1) rotate(0deg);
            }
            50% {
                transform: scale(1.15) rotate(5deg);
            }
            100% {
                transform: scale(1.3) rotate(10deg);
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== Interactive Project Cards Animation =====
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        // Create icon glow element
        const icon = card.querySelector('i');
        if (icon) {
            const glow = document.createElement('div');
            glow.className = 'icon-glow';
            icon.parentNode.insertBefore(glow, icon);
            icon.parentNode.insertBefore(icon, glow.nextSibling);
        }

        // Add enhanced ripple effect on mouse enter
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create multiple ripples
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const ripple = document.createElement('div');
                    ripple.style.position = 'absolute';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.style.width = '0px';
                    ripple.style.height = '0px';
                    ripple.style.background = 'radial-gradient(circle, rgba(194, 166, 140, 0.6) 0%, transparent 70%)';
                    ripple.style.borderRadius = '50%';
                    ripple.style.pointerEvents = 'none';
                    ripple.style.zIndex = '0';

                    this.appendChild(ripple);

                    // Animate ripple
                    let size = 0;
                    const maxSize = 250;
                    const interval = setInterval(() => {
                        size += 10;
                        ripple.style.width = size + 'px';
                        ripple.style.height = size + 'px';
                        ripple.style.left = (x - size / 2) + 'px';
                        ripple.style.top = (y - size / 2) + 'px';

                        if (size >= maxSize) {
                            clearInterval(interval);
                            ripple.remove();
                        }
                    }, 30);
                }, i * 80);
            }
        });

        // Add mouse move tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            // Store original transform and enhance it
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        // Reset tilt on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });

        // Add click flash effect
        card.addEventListener('click', function(e) {
            // Create flash element
            const flash = document.createElement('div');
            flash.style.position = 'absolute';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)';
            flash.style.pointerEvents = 'none';
            flash.style.opacity = '0';
            flash.style.zIndex = '5';

            this.appendChild(flash);

            // Animate flash
            flash.offsetHeight; // trigger reflow
            flash.style.transition = 'opacity 0.6s ease-out';
            flash.style.opacity = '1';

            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 600);
            }, 100);

            // Create particle burst effect
            createParticleBurst(e, this);
        });

        // Add hover glow effect
        card.addEventListener('mouseenter', function() {
            const button = this.querySelector('.project-button');
            const icon = this.querySelector('i');
            
            if (button) {
                button.style.textShadow = '0 0 20px rgba(194, 166, 140, 0.6)';
            }
            
            // Add icon pulse effect
            if (icon) {
                icon.style.animation = 'iconPulse 0.6s ease-out';
            }
        });

        card.addEventListener('mouseleave', function() {
            const button = this.querySelector('.project-button');
            const icon = this.querySelector('i');
            
            if (button) {
                button.style.textShadow = 'none';
            }
            
            if (icon) {
                icon.style.animation = '';
            }
        });
    });

    // Create particle burst effect
    function createParticleBurst(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 3 + Math.random() * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.background = `hsl(${33 + Math.random() * 30}, 80%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.boxShadow = '0 0 10px rgba(194, 166, 140, 0.8)';
            particle.style.zIndex = '4';

            element.appendChild(particle);

            // Animate particle
            let px = x;
            let py = y;
            let life = 1;
            const decay = 0.98;

            const animate = () => {
                life *= decay;
                px += vx;
                py += vy;

                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = life.toString();

                if (life > 0.1) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };

            animate();
        }
    }

    // Add intersection observer for staggered entrance animation
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach((card) => {
        observer.observe(card);
    });
});

// ===== Interactive Contact Form =====
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-button');

    // Input ripple effect
    function addInputRipple(input) {
        input.addEventListener('focus', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left || rect.width / 2;
            const y = e.clientY - rect.top || rect.height / 2;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.background = 'radial-gradient(circle, rgba(194, 166, 140, 0.4) 0%, transparent 70%)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '0';

            this.style.position = 'relative';
            this.appendChild(ripple);

            // Animate ripple
            let size = 0;
            const maxSize = 150;
            const interval = setInterval(() => {
                size += 6;
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = (x - size / 2) + 'px';
                ripple.style.top = (y - size / 2) + 'px';

                if (size >= maxSize) {
                    clearInterval(interval);
                    setTimeout(() => ripple.remove(), 300);
                }
            }, 20);
        });
    }

    // Add ripple to inputs
    addInputRipple(nameInput);
    addInputRipple(emailInput);
    addInputRipple(messageInput);

    // Input label animation
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        const label = input.previousElementSibling;

        input.addEventListener('focus', function() {
            label.style.color = 'var(--element-color)';
            label.style.transform = 'translateY(-5px) scale(0.9)';
            label.style.transition = 'all 300ms ease';
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                label.style.color = 'var(--font-color)';
                label.style.transform = 'translateY(0) scale(1)';
            }
        });

        // Check initial value
        if (input.value !== '') {
            label.style.transform = 'translateY(-5px) scale(0.9)';
        }
    });


    // Form submission with animation
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Validation
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showValidationError();
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showValidationError('Email tidak valid');
            return;
        }

        // Show loading state
        submitBtn.classList.add('sending');
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';

        // Simulate sending
        setTimeout(() => {
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('success');
            submitBtn.textContent = '✓ Pesan Terkirim!';

            // Show success message
            showSuccessMessage(name);

            // Reset form
            setTimeout(() => {
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';

                // Reset labels
                inputs.forEach(input => {
                    const label = input.previousElementSibling;
                    label.style.color = 'var(--font-color)';
                    label.style.transform = 'translateY(0) scale(1)';
                });

                // Reset button
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                // Clear char counter
                const counter = messageInput.nextElementSibling;
                if (counter && counter.classList.contains('char-counter')) {
                    counter.textContent = '0/500 karakter';
                }
            }, 2000);
        }, 1500);
    });

    // Validation error animation
    function showValidationError(message = 'Silakan isi semua field dengan benar') {
        const contactMe = document.querySelector('.contact-me');
        
        // Shake animation
        contactMe.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            contactMe.style.animation = '';
        }, 500);

        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.textContent = '⚠ ' + message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4d4f;
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-family: var(--font-primary);
            font-weight: 600;
            box-shadow: 0 8px 24px rgba(255, 77, 79, 0.3);
            animation: slideInDown 0.4s ease-out;
            z-index: 999;
        `;

        document.body.appendChild(errorDiv);

        setTimeout(() => {
            errorDiv.style.animation = 'slideOutUp 0.4s ease-out';
            setTimeout(() => errorDiv.remove(), 400);
        }, 3000);
    }

    // Success message
    function showSuccessMessage(name) {
        const successDiv = document.createElement('div');
        successDiv.className = 'contact-success';
        successDiv.innerHTML = `
            <div class="contact-success-icon">✓</div>
            <h3>Terima kasih, ${name}!</h3>
            <p>Pesan Anda telah terkirim dengan sukses. Kami akan segera menghubungi Anda.</p>
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.style.animation = 'scaleOut 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            setTimeout(() => successDiv.remove(), 500);
        }, 3000);
    }

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            10%, 30%, 50%, 70%, 90% {
                transform: translateX(-10px);
            }
            20%, 40%, 60%, 80% {
                transform: translateX(10px);
            }
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }

        @keyframes slideOutUp {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }

        @keyframes scaleOut {
            from {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            to {
                transform: translate(-50%, -50%) scale(0.3);
                opacity: 0;
            }
        }

        .char-counter {
            transition: color 300ms ease;
        }
    `;
    document.head.appendChild(style);

    // Social media icon interactive animation
    const socialIcons = document.querySelectorAll('.social-media-icon i');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
        });

        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Social media links hover effect
    const socialLinks = document.querySelectorAll('.social-media-icon a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const bubble = document.createElement('div');
            bubble.style.position = 'absolute';
            bubble.style.left = x + 'px';
            bubble.style.top = y + 'px';
            bubble.style.width = '0px';
            bubble.style.height = '0px';
            bubble.style.background = 'radial-gradient(circle, rgba(194, 166, 140, 0.3) 0%, transparent 70%)';
            bubble.style.borderRadius = '50%';
            bubble.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.appendChild(bubble);

            let size = 0;
            const maxSize = 100;
            const interval = setInterval(() => {
                size += 5;
                bubble.style.width = size + 'px';
                bubble.style.height = size + 'px';
                bubble.style.left = (x - size / 2) + 'px';
                bubble.style.top = (y - size / 2) + 'px';

                if (size >= maxSize) {
                    clearInterval(interval);
                    setTimeout(() => bubble.remove(), 200);
                }
            }, 15);
        });
    });
});
