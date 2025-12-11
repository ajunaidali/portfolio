// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    const textToType = "Hi, I'm Junaid Ali";
    let index = 0;
    
    function typeCharacter() {
        if (index < textToType.length) {
            const currentText = textToType.substring(0, index + 1);
            
            // Apply gradient to the name part
            if (currentText.includes("Junaid Ali")) {
                const parts = currentText.split("Junaid Ali");
                if (parts[0]) {
                    typingText.innerHTML = parts[0] + '<span class="gradient-text">Junaid Ali</span>';
                } else {
                    typingText.innerHTML = '<span class="gradient-text">' + currentText + '</span>';
                }
            } else {
                typingText.textContent = currentText;
            }
            
            index++;
            setTimeout(typeCharacter, 100);
        } else {
            // Animation complete, keep cursor visible
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.animation = 'none';
                cursor.style.opacity = '1';
            }
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeCharacter, 500);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    if (mobileNav.classList.contains('active')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Smooth scroll function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        mobileNav.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// Current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Demo Modal Functions
const demoModal = document.getElementById('demoModal');
const demoContent = document.getElementById('demoContent');

function openDemo(type) {
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (type === 'calculator') {
        renderCalculatorDemo();
    } else if (type === 'shoes') {
        renderShoesDemo();
    } else if (type === 'clothing') {
        renderClothingDemo();
    }
}

function closeDemo() {
    demoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    demoContent.innerHTML = '';
}

// Calculator Demo
function renderCalculatorDemo() {
    let display = '0';
    let previousValue = null;
    let operation = null;
    let waitingForOperand = false;

    const calculatorHTML = `
        <div style="background: #0f172a; border-radius: 1rem; width: 500%; max-width: 28rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid #334155;">
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid #334155;">
                <h2 style="color: white; font-size: 1.25rem; margin: 0;">Calculator App</h2>
                <button onclick="closeDemo()" style="padding: 0.5rem; background: none; border: none; cursor: pointer; color: white; border-radius: 0.5rem; transition: background 0.2s;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div style="padding: 1.5rem;">
                <div style="background: #020617; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid #334155;">
                    <div id="calcDisplay" style="text-align: right; color: white; font-size: 2.25rem; overflow: hidden; text-overflow: ellipsis;">0</div>
                </div>
                <div id="calcButtons" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;"></div>
            </div>
        </div>
    `;
    
    demoContent.innerHTML = calculatorHTML;
    
    const displayElement = document.getElementById('calcDisplay');
    const buttonsContainer = document.getElementById('calcButtons');
    
    function updateDisplay() {
        displayElement.textContent = display;
    }
    
    function inputDigit(digit) {
        if (waitingForOperand) {
            display = digit;
            waitingForOperand = false;
        } else {
            display = display === '0' ? digit : display + digit;
        }
        updateDisplay();
    }
    
    function inputDecimal() {
        if (waitingForOperand) {
            display = '0.';
            waitingForOperand = false;
        } else if (display.indexOf('.') === -1) {
            display = display + '.';
        }
        updateDisplay();
    }
    
    function clear() {
        display = '0';
        previousValue = null;
        operation = null;
        waitingForOperand = false;
        updateDisplay();
    }
    
    function performOperation(nextOperation) {
        const inputValue = parseFloat(display);
        
        if (previousValue === null) {
            previousValue = inputValue;
        } else if (operation) {
            const currentValue = previousValue || 0;
            let newValue = currentValue;
            
            switch (operation) {
                case '+':
                    newValue = currentValue + inputValue;
                    break;
                case '-':
                    newValue = currentValue - inputValue;
                    break;
                case '*':
                    newValue = currentValue * inputValue;
                    break;
                case '/':
                    newValue = currentValue / inputValue;
                    break;
            }
            
            display = String(newValue);
            previousValue = newValue;
            updateDisplay();
        }
        
        waitingForOperand = true;
        operation = nextOperation;
    }
    
    function handleEquals() {
        const inputValue = parseFloat(display);
        
        if (previousValue !== null && operation) {
            let result = previousValue;
            
            switch (operation) {
                case '+':
                    result = previousValue + inputValue;
                    break;
                case '-':
                    result = previousValue - inputValue;
                    break;
                case '*':
                    result = previousValue * inputValue;
                    break;
                case '/':
                    result = previousValue / inputValue;
                    break;
            }
            
            display = String(result);
            previousValue = null;
            operation = null;
            waitingForOperand = true;
            updateDisplay();
        }
    }
    
    const buttons = [
        { text: 'AC', action: clear, style: 'background: #dc2626; color: white; grid-column: span 2;' },
        { text: '÷', action: () => performOperation('/'), style: 'background: #2563eb; color: white;' },
        { text: '×', action: () => performOperation('*'), style: 'background: #2563eb; color: white;' },
        { text: '7', action: () => inputDigit('7'), style: 'background: #1e293b; color: white;' },
        { text: '8', action: () => inputDigit('8'), style: 'background: #1e293b; color: white;' },
        { text: '9', action: () => inputDigit('9'), style: 'background: #1e293b; color: white;' },
        { text: '−', action: () => performOperation('-'), style: 'background: #2563eb; color: white;' },
        { text: '4', action: () => inputDigit('4'), style: 'background: #1e293b; color: white;' },
        { text: '5', action: () => inputDigit('5'), style: 'background: #1e293b; color: white;' },
        { text: '6', action: () => inputDigit('6'), style: 'background: #1e293b; color: white;' },
        { text: '+', action: () => performOperation('+'), style: 'background: #2563eb; color: white;' },
        { text: '1', action: () => inputDigit('1'), style: 'background: #1e293b; color: white;' },
        { text: '2', action: () => inputDigit('2'), style: 'background: #1e293b; color: white;' },
        { text: '3', action: () => inputDigit('3'), style: 'background: #1e293b; color: white;' },
        { text: '=', action: handleEquals, style: 'background: #16a34a; color: white; grid-row: span 2;' },
        { text: '0', action: () => inputDigit('0'), style: 'background: #1e293b; color: white; grid-column: span 2;' },
        { text: '.', action: inputDecimal, style: 'background: #1e293b; color: white;' }
    ];
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.style.cssText = `${btn.style} padding: 1rem; border: none; border-radius: 0.75rem; cursor: pointer; font-size: 1.125rem; transition: opacity 0.2s;`;
        button.onmouseover = () => button.style.opacity = '0.8';
        button.onmouseout = () => button.style.opacity = '1';
        button.onclick = btn.action;
        buttonsContainer.appendChild(button);
    });
}

// Shoes Demo
function renderShoesDemo() {
    let cart = 0;
    
    const shoes = [
        { id: 1, name: "Air Max Pro", price: 129.99, rating: 4.5, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", category: "Running" },
        { id: 2, name: "Classic White", price: 89.99, rating: 4.8, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500", category: "Casual" },
        { id: 3, name: "Urban Runner", price: 149.99, rating: 4.6, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500", category: "Running" },
        { id: 4, name: "Sport Elite", price: 179.99, rating: 4.9, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", category: "Athletic" },
        { id: 5, name: "Street Style", price: 99.99, rating: 4.3, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500", category: "Casual" },
        { id: 6, name: "Performance+", price: 199.99, rating: 4.7, image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500", category: "Athletic" }
    ];
    
    function updateCartCount() {
        document.getElementById('shoesCartCount').textContent = cart;
        document.getElementById('shoesCartCount').style.display = cart > 0 ? 'flex' : 'none';
    }
    
    function addToCart() {
        cart++;
        updateCartCount();
    }
    
    const productsHTML = shoes.map(shoe => `
        <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: box-shadow 0.3s;">
            <div style="position: relative; overflow: hidden; background: #f3f4f6;">
                <img src="${shoe.image}" alt="${shoe.name}" style="width: 100%; height: 16rem; object-fit: cover;">
                <span style="position: absolute; top: 1rem; right: 1rem; background: #2563eb; color: white; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem;">${shoe.category}</span>
            </div>
            <div style="padding: 1.5rem;">
                <h3 style="color: #111827; margin-bottom: 0.5rem; font-size: 1.125rem;">${shoe.name}</h3>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    ${Array(5).fill(0).map((_, i) => `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="${i < Math.floor(shoe.rating) ? '#facc15' : 'none'}" stroke="${i < Math.floor(shoe.rating) ? '#facc15' : '#d1d5db'}" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    `).join('')}
                    <span style="color: #4b5563; font-size: 0.875rem; margin-left: 0.5rem;">(${shoe.rating})</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span style="color: #111827; font-size: 1.25rem; font-weight: 700;">$${shoe.price}</span>
                    <button onclick="addToShoesCart()" style="background: #2563eb; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: background 0.2s;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const shoesHTML = `
        <div style="position: fixed; inset: 0; background: white; overflow: auto; z-index: 100;">
            <header style="position: sticky; top: 0; background: white; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); z-index: 10;">
                <div style="max-width: 1280px; margin: 0 auto; padding: 1rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h1 style="color: #111827; margin: 0; font-size: 1.5rem;">SneakerHub</h1>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button style="position: relative; padding: 0.5rem; background: none; border: none; cursor: pointer; border-radius: 0.5rem; transition: background 0.2s;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <span id="shoesCartCount" style="display: none; position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; font-size: 0.75rem; width: 1.25rem; height: 1.25rem; border-radius: 9999px; align-items: center; justify-content: center;">0</span>
                            </button>
                            <button onclick="closeDemo()" style="padding: 0.5rem; background: none; border: none; cursor: pointer; border-radius: 0.5rem; transition: background 0.2s;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <section style="background: linear-gradient(to right, #2563eb, #9333ea); color: white; padding: 4rem 1rem; text-align: center;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <h2 style="margin-bottom: 1rem; font-size: 2rem; color: white;">Step Into Style</h2>
                    <p style="font-size: 1.25rem; margin-bottom: 1.5rem;">Discover the latest collection of premium sneakers</p>
                    <button style="background: white; color: #2563eb; padding: 0.75rem 2rem; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; font-weight: 600; transition: background 0.2s;">Shop Now</button>
                </div>
            </section>
            
            <section style="padding: 3rem 1rem;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
                        <h2 style="color: #111827; margin: 0;">Featured Products</h2>
                        <select style="border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.5rem 1rem; background: white;">
                            <option>All Categories</option>
                            <option>Running</option>
                            <option>Casual</option>
                            <option>Athletic</option>
                        </select>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                        ${productsHTML}
                    </div>
                </div>
            </section>
            
            <footer style="background: #111827; color: white; padding: 2rem 1rem; margin-top: 3rem; text-align: center;">
                <p style="color: #9ca3af;">© 2024 SneakerHub. All rights reserved.</p>
            </footer>
        </div>
    `;
    
    demoContent.innerHTML = shoesHTML;
    
    window.addToShoesCart = addToCart;
}

// Clothing Demo
function renderClothingDemo() {
    let favorites = [];
    
    const products = [
        { id: 1, name: "Classic Denim Jacket", price: 79.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", category: "Jackets", tag: "Trending" },
        { id: 2, name: "Summer Floral Dress", price: 59.99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500", category: "Dresses", tag: "New" },
        { id: 3, name: "Casual Cotton T-Shirt", price: 24.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", category: "T-Shirts", tag: "Sale" },
        { id: 4, name: "Slim Fit Chinos", price: 49.99, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500", category: "Pants", tag: "" },
        { id: 5, name: "Wool Blend Sweater", price: 89.99, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500", category: "Sweaters", tag: "Trending" },
        { id: 6, name: "Leather Crossbody Bag", price: 129.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", category: "Accessories", tag: "New" }
    ];
    
    function toggleFavorite(id) {
        if (favorites.includes(id)) {
            favorites = favorites.filter(f => f !== id);
        } else {
            favorites.push(id);
        }
        renderClothingDemo();
    }
    
    const productsHTML = products.map(product => `
        <div style="background: white; border-radius: 0.75rem; overflow: hidden; border: 1px solid #e5e7eb; transition: box-shadow 0.3s;">
            <div style="position: relative; overflow: hidden; background: #f9fafb;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 20rem; object-fit: cover;">
                ${product.tag ? `
                    <span style="position: absolute; top: 1rem; left: 1rem; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.875rem; color: white; background: ${product.tag === 'New' ? '#16a34a' : product.tag === 'Sale' ? '#dc2626' : '#9333ea'};}">${product.tag}</span>
                ` : ''}
                <button onclick="toggleClothingFavorite(${product.id})" style="position: absolute; top: 1rem; right: 1rem; padding: 0.5rem; background: white; border: none; border-radius: 9999px; cursor: pointer; transition: background 0.2s;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${favorites.includes(product.id) ? '#ef4444' : 'none'}" stroke="${favorites.includes(product.id) ? '#ef4444' : '#374151'}" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div style="padding: 1.5rem;">
                <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.25rem;">${product.category}</p>
                <h3 style="color: #111827; margin-bottom: 0.75rem; font-size: 1.125rem;">${product.name}</h3>
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span style="color: #111827; font-size: 1.25rem; font-weight: 700;">$${product.price}</span>
                    <button style="background: #111827; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer; transition: background 0.2s;">Add to Bag</button>
                </div>
            </div>
        </div>
    `).join('');
    
    const clothingHTML = `
        <div style="position: fixed; inset: 0; background: white; overflow: auto; z-index: 100;">
            <header style="position: sticky; top: 0; background: white; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1); z-index: 10;">
                <div style="max-width: 1280px; margin: 0 auto; padding: 1rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h1 style="color: #111827; margin: 0; font-size: 1.5rem; letter-spacing: 0.05em;">FASHION STORE</h1>
                        <nav style="display: none; gap: 1.5rem;">
                            <a href="#" style="color: #374151; text-decoration: none;">Women</a>
                            <a href="#" style="color: #374151; text-decoration: none;">Men</a>
                            <a href="#" style="color: #374151; text-decoration: none;">Kids</a>
                            <a href="#" style="color: #374151; text-decoration: none;">Sale</a>
                        </nav>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <button style="padding: 0.5rem; background: none; border: none; cursor: pointer; border-radius: 0.5rem;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                            <button style="padding: 0.5rem; background: none; border: none; cursor: pointer; border-radius: 0.5rem;">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </button>
                            <button onclick="closeDemo()" style="padding: 0.5rem; background: none; border: none; cursor: pointer; border-radius: 0.5rem;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <section style="position: relative; background: linear-gradient(to right, #fce7f3, #f3e8ff); padding: 5rem 1rem; text-align: center;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <p style="color: #db2777; margin-bottom: 0.5rem; font-weight: 600;">New Collection 2024</p>
                    <h2 style="color: #111827; margin-bottom: 1rem; font-size: 2rem;">Elevate Your Style</h2>
                    <p style="color: #374151; margin-bottom: 1.5rem; max-width: 42rem; margin-left: auto; margin-right: auto;">
                        Discover the latest trends in fashion with our curated collection of premium clothing and accessories.
                    </p>
                    <button style="background: #111827; color: white; padding: 0.75rem 2rem; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; font-weight: 600; transition: background 0.2s;">Shop Collection</button>
                </div>
            </section>
            
            <section style="padding: 2rem 1rem; border-bottom: 1px solid #e5e7eb;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <div style="display: flex; gap: 1rem; overflow-x: auto;">
                        ${['All', 'Jackets', 'Dresses', 'T-Shirts', 'Pants', 'Sweaters', 'Accessories'].map(cat => `
                            <button style="padding: 0.5rem 1.5rem; border-radius: 9999px; white-space: nowrap; border: none; cursor: pointer; background: ${cat === 'All' ? '#111827' : '#f3f4f6'}; color: ${cat === 'All' ? 'white' : '#374151'}; transition: background 0.2s;">${cat}</button>
                        `).join('')}
                    </div>
                </div>
            </section>
            
            <section style="padding: 3rem 1rem;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
                        <h2 style="color: #111827; margin: 0;">Featured Products</h2>
                        <select style="border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.5rem 1rem; background: white;">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest First</option>
                        </select>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                        ${productsHTML}
                    </div>
                </div>
            </section>
            
            <section style="background: #f3f4f6; padding: 4rem 1rem; text-align: center;">
                <div style="max-width: 1280px; margin: 0 auto;">
                    <h2 style="color: #111827; margin-bottom: 1rem;">Join Our Newsletter</h2>
                    <p style="color: #6b7280; margin-bottom: 1.5rem; max-width: 36rem; margin-left: auto; margin-right: auto;">
                        Subscribe to get special offers, free giveaways, and exclusive deals.
                    </p>
                    <div style="display: flex; gap: 0.5rem; max-width: 28rem; margin: 0 auto;">
                        <input type="email" placeholder="Enter your email" style="flex: 1; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;">
                        <button style="background: #111827; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; transition: background 0.2s;">Subscribe</button>
                    </div>
                </div>
            </section>
            
            <footer style="background: #111827; color: white; padding: 3rem 1rem;">
                <div style="max-width: 1280px; margin: 0 auto; text-align: center;">
                    <p style="color: #9ca3af;">© 2024 Fashion Store. All rights reserved.</p>
                </div>
            </footer>
        </div>
    `;
    
    demoContent.innerHTML = clothingHTML;
    
    window.toggleClothingFavorite = toggleFavorite;
}

// Close modal when clicking outside
demoModal.addEventListener('click', function(e) {
    if (e.target === demoModal) {
        closeDemo();
    }
});