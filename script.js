document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle animation for menu icon
            document.querySelectorAll('.bar').forEach((bar, index) => {
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) {
                        bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        bar.style.opacity = '0';
                    } else if (index === 2) {
                        bar.style.transform = 'rotate(-45deg) translate(7px, -8px)';
                    }
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                
                document.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service Modal Functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Service details data
    const serviceDetails = {
        finance: {
            title: 'Finance & Funding',
            content: `
                <div class="service-detail">
                    <h3>Business Loans</h3>
                    <p>Access competitive business loans tailored to your company's needs with flexible repayment options.</p>
                    <ul>
                        <li>Short-term working capital loans</li>
                        <li>Equipment financing</li>
                        <li>Business expansion loans</li>
                        <li>Commercial real estate loans</li>
                    </ul>
                    
                    <h3>Personal Finance Guidance</h3>
                    <p>Receive expert advice on managing your personal finances and making informed investment decisions.</p>
                    <ul>
                        <li>Retirement planning</li>
                        <li>Investment portfolio management</li>
                        <li>Debt consolidation</li>
                        <li>College funding strategies</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to explore your financial options?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Contact Our Financial Team</a>
                    </div>
                </div>
            `
        },
        marketing: {
            title: 'Digital Marketing & Business Mentorship',
            content: `
                <div class="service-detail">
                    <h3>Digital Marketing Services</h3>
                    <p>Comprehensive digital marketing solutions to boost your online presence and drive growth.</p>
                    <ul>
                        <li>Search Engine Optimization (SEO)</li>
                        <li>Social Media Marketing & Management</li>
                        <li>Content Marketing Strategies</li>
                        <li>Pay-Per-Click (PPC) Advertising</li>
                        <li>Email Marketing Campaigns</li>
                    </ul>
                    
                    <h3>Business Mentorship</h3>
                    <p>Get guidance from experienced business mentors to take your business to the next level.</p>
                    <ul>
                        <li>Business model evaluation</li>
                        <li>Growth strategy development</li>
                        <li>Operational efficiency consulting</li>
                        <li>Market positioning advice</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to transform your digital presence?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Speak With Our Marketing Team</a>
                    </div>
                </div>
            `
        },
        travel: {
            title: 'Tours & Travel',
            content: `
                <div class="service-detail">
                    <h3>Domestic Travel Packages</h3>
                    <p>Explore the hidden gems and popular destinations within your country with our curated travel packages.</p>
                    <ul>
                        <li>Weekend getaways</li>
                        <li>Cultural exploration tours</li>
                        <li>Adventure travel experiences</li>
                        <li>Luxury staycations</li>
                    </ul>
                    
                    <h3>International Travel</h3>
                    <p>Discover the world with our international travel services and expertly crafted itineraries.</p>
                    <ul>
                        <li>Multi-country European tours</li>
                        <li>Exotic Asian destinations</li>
                        <li>African safaris</li>
                        <li>South American adventures</li>
                    </ul>
                    
                    <h3>Corporate Travel Packages</h3>
                    <p>Specialized travel solutions for businesses including retreats, conferences, and team-building trips.</p>
                    
                    <div class="cta-section">
                        <p>Ready to plan your next journey?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Contact Our Travel Experts</a>
                    </div>
                </div>
            `
        },
        wholesale: {
            title: 'Wholesale Goods Supply',
            content: `
                <div class="service-detail">
                    <h3>Wholesale Product Categories</h3>
                    <p>Access quality wholesale products across multiple categories at competitive prices.</p>
                    <ul>
                        <li>Electronics & Gadgets</li>
                        <li>Office Supplies & Furniture</li>
                        <li>Apparel & Textiles</li>
                        <li>Home & Kitchen Products</li>
                        <li>Construction Materials</li>
                        <li>Food & Beverages</li>
                    </ul>
                    
                    <h3>Supply Chain Solutions</h3>
                    <p>Comprehensive solutions to optimize your supply chain and inventory management.</p>
                    <ul>
                        <li>Just-in-time inventory systems</li>
                        <li>Warehousing services</li>
                        <li>Distribution network optimization</li>
                        <li>Import/Export facilitation</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to streamline your wholesale purchases?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Get Wholesale Quotes</a>
                    </div>
                </div>
            `
        },
        design: {
            title: 'Interior & Exterior Designing',
            content: `
                <div class="service-detail">
                    <h3>Interior Design Services</h3>
                    <p>Transform your indoor spaces with our professional interior design solutions.</p>
                    <ul>
                        <li>Residential interior design</li>
                        <li>Commercial space design</li>
                        <li>Office layout planning</li>
                        <li>Furniture selection and arrangement</li>
                        <li>Color scheme consultation</li>
                        <li>Lighting design</li>
                    </ul>
                    
                    <h3>Exterior Design Services</h3>
                    <p>Create stunning outdoor environments that enhance your property's appeal and functionality.</p>
                    <ul>
                        <li>Landscape design</li>
                        <li>Facade improvements</li>
                        <li>Outdoor living spaces</li>
                        <li>Curb appeal enhancement</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to transform your space?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Consult With Our Design Team</a>
                    </div>
                </div>
            `
        },
        construction: {
            title: 'Construction Services',
            content: `
                <div class="service-detail">
                    <h3>Building Construction</h3>
                    <p>Complete building solutions from foundation to finish with quality craftsmanship.</p>
                    <ul>
                        <li>Residential construction</li>
                        <li>Commercial building development</li>
                        <li>Industrial facility construction</li>
                        <li>Structural engineering</li>
                    </ul>
                    
                    <h3>Renovation & Remodeling</h3>
                    <p>Transform existing spaces with our expert renovation and remodeling services.</p>
                    <ul>
                        <li>Kitchen & bathroom remodeling</li>
                        <li>Home additions</li>
                        <li>Commercial space renovation</li>
                        <li>Historic building restoration</li>
                    </ul>
                    
                    <h3>Specialized Construction</h3>
                    <ul>
                        <li>Green building practices</li>
                        <li>Accessibility modifications</li>
                        <li>Disaster-resistant construction</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to start your construction project?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Get a Construction Estimate</a>
                    </div>
                </div>
            `
        },
        automotive: {
            title: 'Automobile Repair & Maintenance',
            content: `
                <div class="service-detail">
                    <h3>Vehicle Repair Services</h3>
                    <p>Complete automotive repair solutions to keep your vehicles running smoothly.</p>
                    <ul>
                        <li>Engine diagnostics and repair</li>
                        <li>Transmission service</li>
                        <li>Brake system maintenance</li>
                        <li>Electrical system repair</li>
                        <li>Suspension and steering service</li>
                    </ul>
                    
                    <h3>Routine Maintenance</h3>
                    <p>Preventive maintenance services to extend your vehicle's lifespan.</p>
                    <ul>
                        <li>Oil changes and fluid checks</li>
                        <li>Filter replacement</li>
                        <li>Tire rotation and alignment</li>
                        <li>Battery testing and replacement</li>
                        <li>Scheduled maintenance packages</li>
                    </ul>
                    
                    <h3>Fleet Services</h3>
                    <p>Specialized maintenance programs for business vehicle fleets.</p>
                    
                    <div class="cta-section">
                        <p>Ready to service your vehicle?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Schedule Service Appointment</a>
                    </div>
                </div>
            `
        },
        events: {
            title: 'Event Management',
            content: `
                <div class="service-detail">
                    <h3>Wedding Planning</h3>
                    <p>Comprehensive wedding planning services to create your perfect day.</p>
                    <ul>
                        <li>Venue selection and booking</li>
                        <li>Vendor coordination</li>
                        <li>Decor and theme design</li>
                        <li>Day-of coordination</li>
                        <li>Full-service wedding planning</li>
                    </ul>
                    
                    <h3>Corporate Events</h3>
                    <p>Professional management of business events that achieve your company objectives.</p>
                    <ul>
                        <li>Conferences and seminars</li>
                        <li>Product launches</li>
                        <li>Corporate retreats</li>
                        <li>Award ceremonies</li>
                        <li>Team building events</li>
                    </ul>
                    
                    <h3>Social Gatherings</h3>
                    <p>Planning services for private celebrations and parties.</p>
                    <ul>
                        <li>Birthday parties</li>
                        <li>Anniversary celebrations</li>
                        <li>Graduation parties</li>
                        <li>Holiday events</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to plan your next event?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Consult With Our Event Team</a>
                    </div>
                </div>
            `
        },
        home: {
            title: 'Home Services',
            content: `
                <div class="service-detail">
                    <h3>Available Home Services</h3>
                    <p>Complete home maintenance and convenience services for busy homeowners.</p>
                    
                    <h4>Plumbing Services</h4>
                    <ul>
                        <li>Leak detection and repair</li>
                        <li>Fixture installation</li>
                        <li>Drain cleaning</li>
                        <li>Water heater service</li>
                    </ul>
                    
                    <h4>Laundry Services</h4>
                    <ul>
                        <li>Wash and fold</li>
                        <li>Dry cleaning</li>
                        <li>Pickup and delivery</li>
                    </ul>
                    
                    <h4>Grocery Delivery</h4>
                    <ul>
                        <li>Same-day delivery</li>
                        <li>Custom shopping lists</li>
                        <li>Fresh produce selection</li>
                    </ul>
                    
                    <h4>Carpentry Services</h4>
                    <ul>
                        <li>Furniture repair</li>
                        <li>Custom woodworking</li>
                        <li>Cabinet installation</li>
                        <li>Structural repairs</li>
                    </ul>
                    
                    <h4>House Cleaning</h4>
                    <ul>
                        <li>Regular cleaning services</li>
                        <li>Deep cleaning</li>
                        <li>Move-in/move-out cleaning</li>
                        <li>Specialized cleaning services</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to make your home life easier?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Schedule Home Services</a>
                    </div>
                </div>
            `
        },
        rental: {
            title: 'Rental Services',
            content: `
                <div class="service-detail">
                    <h3>Equipment Rental</h3>
                    <p>Rent professional equipment for any project without the cost of ownership.</p>
                    <ul>
                        <li>Construction equipment</li>
                        <li>Power tools</li>
                        <li>Lawn and garden equipment</li>
                        <li>Audiovisual equipment</li>
                    </ul>
                    
                    <h3>Vehicle Rental</h3>
                    <p>Short and long-term vehicle rentals for personal and business needs.</p>
                    <ul>
                        <li>Cars and SUVs</li>
                        <li>Commercial trucks</li>
                        <li>Specialty vehicles</li>
                        <li>Moving trucks and vans</li>
                    </ul>
                    
                    <h3>Property Rental</h3>
                    <p>Residential and commercial property rental management services.</p>
                    <ul>
                        <li>Vacation rentals</li>
                        <li>Short-term rentals</li>
                        <li>Commercial space leasing</li>
                        <li>Event venue rentals</li>
                    </ul>
                    
                    <div class="cta-section">
                        <p>Ready to inquire about rentals?</p>
                        <a href="#contact" class="btn btn-primary modal-contact-btn">Contact Our Rental Department</a>
                    </div>
                </div>
            `
        }
    };
    
    // Open modal when service card is clicked
    if (serviceCards && modal) {
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceCategory = card.getAttribute('data-category');
                if (serviceDetails[serviceCategory]) {
                    modalTitle.textContent = serviceDetails[serviceCategory].title;
                    modalContent.innerHTML = serviceDetails[serviceCategory].content;
                    
                    // Add event listener to modal contact buttons
                    const modalContactBtns = document.querySelectorAll('.modal-contact-btn');
                    modalContactBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            modal.style.display = 'none';
                            // Pre-select the service in the contact form
                            const serviceSelect = document.getElementById('service');
                            if (serviceSelect) {
                                serviceSelect.value = serviceCategory;
                            }
                        });
                    });
                    
                    modal.style.display = 'flex';
                }
            });
        });
    }
    
    // Close modal when X button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Testimonials slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    
    // Initialize testimonial slider
    if (slides.length > 0) {
        // Set the first slide as active
        slides[currentSlide].classList.add('active');
        
        // Function to show a specific slide
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.display = 'none';
            });
            
            // Show the selected slide
            slides[index].classList.add('active');
            slides[index].style.display = 'block';
        };
        
        // Event listeners for slider controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }
        
        // Initialize the first slide
        showSlide(0);
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation - could be expanded
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const service = document.getElementById('service').value;
            
            if (name && email && subject && message && service) {
                // In a real application, you would send this data to a server
                // For this demo, we'll just show an alert
                alert(`Thank you ${name} for contacting us about our ${service} services. We will get back to you shortly!`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real application, you would send this data to a server
                alert(`Thank you for subscribing to our newsletter with ${email}!`);
                newsletterForm.reset();
            } else {
                alert('Please enter your email.');
            }
        });
    }
    
    // Enhanced sticky header on scroll with class toggle
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animation on scroll effect for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .about-content, .testimonial-container, .contact-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    };
    
    // Apply initial animation classes
    document.querySelectorAll('.service-card, .about-content, .testimonial-container, .contact-container').forEach(element => {
        element.classList.add('animate-ready');
    });
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize visible content
    showInitialContent();
});

// Function to ensure first testimonial and other content is visible on page load
function showInitialContent() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        slides[0].style.display = 'block';
        slides[0].classList.add('active');
    }
}