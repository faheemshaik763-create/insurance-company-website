/* Faheem Insurance Company - Interactive Master Script */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switcher Engine
  initThemeSwitcher();

  // Mobile Navigation Toggle
  initMobileNav();

  // Premium Calculator Engine
  initPremiumCalculator();

  // Claim Tracker Engine
  initClaimTracker();

  // Accordion Logic
  initAccordions();

  // Network Directory Filter
  initNetworkFilter();

  // Client Portal Functions
  initClientPortal();

  // Modal Handlers
  initModals();
});

// Dark/Light Theme Switcher
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('faheem-theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('faheem-theme', 'light');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('faheem-theme', 'dark');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }
}

// Mobile Nav Toggle
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }
}

// Interactive Premium Calculator with Riders & Tax Savings
function initPremiumCalculator() {
  const ageSlider = document.getElementById('calc-age');
  const ageVal = document.getElementById('calc-age-val');
  const coverageSlider = document.getElementById('calc-coverage');
  const coverageVal = document.getElementById('calc-coverage-val');
  const planType = document.getElementById('calc-plan-type');
  const termSelect = document.getElementById('calc-term');
  const priceDisplay = document.getElementById('calc-monthly-price');
  const annualDisplay = document.getElementById('calc-annual-price');
  const taxSavingsDisplay = document.getElementById('calc-tax-savings');

  if (!ageSlider || !coverageSlider || !priceDisplay) return;

  function calculate() {
    const age = parseInt(ageSlider.value) || 30;
    const coverage = parseInt(coverageSlider.value) || 250000;
    const type = planType ? planType.value : 'health';
    const term = termSelect ? parseInt(termSelect.value) : 10;

    if (ageVal) ageVal.textContent = `${age} Years`;
    if (coverageVal) coverageVal.textContent = `$${coverage.toLocaleString()}`;

    // Base Calculation Factor
    let baseRate = 0.00015;
    if (type === 'life') baseRate = 0.00012;
    if (type === 'auto') baseRate = 0.00022;
    if (type === 'home') baseRate = 0.00010;
    if (type === 'business') baseRate = 0.00030;
    if (type === 'travel') baseRate = 0.00008;

    // Age multiplier
    let ageMultiplier = 1;
    if (age > 35) ageMultiplier += (age - 35) * 0.025;
    if (age > 50) ageMultiplier += (age - 50) * 0.04;

    // Term factor
    let termFactor = 1.0 - (term * 0.01);
    if (termFactor < 0.7) termFactor = 0.7;

    // Rider Add-ons
    let riderTotal = 0;
    document.querySelectorAll('.rider-checkbox:checked').forEach(chk => {
      riderTotal += parseInt(chk.value) || 0;
    });

    const monthlyEst = Math.round((coverage * baseRate * ageMultiplier * termFactor) / 12) + riderTotal;
    const annualEst = Math.round(monthlyEst * 11.5);
    const taxSavings = Math.round(annualEst * 0.30); // ~30% tax benefit

    priceDisplay.textContent = `$${monthlyEst}`;
    if (annualDisplay) annualDisplay.textContent = `$${annualEst.toLocaleString()} / year`;
    if (taxSavingsDisplay) taxSavingsDisplay.textContent = `$${taxSavings.toLocaleString()}`;
  }

  // Bind Listeners
  ageSlider.addEventListener('input', calculate);
  coverageSlider.addEventListener('input', calculate);
  if (planType) planType.addEventListener('change', calculate);
  if (termSelect) termSelect.addEventListener('change', calculate);

  document.querySelectorAll('.rider-checkbox').forEach(chk => {
    chk.addEventListener('change', calculate);
  });

  calculate();
}

// Accordion Toggles
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
}

// Claim Tracker Simulation
function initClaimTracker() {
  const claimForm = document.getElementById('claim-track-form');
  const claimResult = document.getElementById('claim-status-result');

  if (!claimForm || !claimResult) return;

  claimForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('claim-id-input').value.trim();

    if (!input) {
      alert('Please enter a valid Claim ID or Policy Number.');
      return;
    }

    claimResult.style.display = 'block';
    claimResult.innerHTML = `
      <div style="background: rgba(13, 148, 136, 0.1); border: 1px solid var(--accent-teal); padding: 1.5rem; border-radius: 12px; margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <h4 style="color: var(--accent-teal); font-size: 1.1rem; margin: 0;"><i class="fas fa-check-circle"></i> Claim Intimation Verified: ${escapeHtml(input)}</h4>
          <span style="background: var(--light-teal); color: #0F766E; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">Fast-Track Phase 3 of 4</span>
        </div>
        <p><strong>Senior Officer:</strong> Executive Officer Faheem</p>
        <p><strong>Status:</strong> Hospital invoice verified. Cashless disbursement queued for 24-hour settlement.</p>
        <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);"><i class="far fa-clock"></i> Next Status Update: Today at 5:00 PM</div>
      </div>
    `;
  });
}

// Network Search Filter
function initNetworkFilter() {
  const searchInput = document.getElementById('network-search');
  const filterType = document.getElementById('network-type-filter');
  const items = document.querySelectorAll('.network-item');

  if (!searchInput && !filterType) return;

  function filter() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const category = filterType ? filterType.value.toLowerCase() : 'all';

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const type = item.getAttribute('data-category') || '';

      const matchesQuery = text.includes(query);
      const matchesCategory = category === 'all' || type === category;

      if (matchesQuery && matchesCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filter);
  if (filterType) filterType.addEventListener('change', filter);
}

// Client Portal Simulation
function initClientPortal() {
  const portalLoginForm = document.getElementById('portal-login-form');
  const portalContent = document.getElementById('portal-dashboard-content');

  if (portalLoginForm && portalContent) {
    portalLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      portalLoginForm.style.display = 'none';
      portalContent.style.display = 'block';
    });
  }
}

// Modal Handlers
function initModals() {
  const openBtns = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('.modal-close, [data-modal-close]');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) modal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  // Generic forms inside modals
  document.querySelectorAll('.modal-box form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Request received! Officer Faheem\'s desk has logged your inquiry. Confirmation dispatched.');
      form.reset();
      const modal = form.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
