// Simple password protection
// Password: 010203 (SHA-256 hash stored)

(function() {
    const CORRECT_HASH = 'b79ea17b7c5ca8fe9cccd8cdba6e8f8ed0b3c948f9f709ed0f47d2fd47fcba82'; // SHA-256 of "010203"
    
    // Check if already authenticated
    if (sessionStorage.getItem('auth') === CORRECT_HASH) {
        return; // Already authenticated
    }
    
    // Hide content
    document.body.style.visibility = 'hidden';
    
    // Prompt for password
    const password = prompt('Enter password to access this page:');
    
    if (!password) {
        document.body.innerHTML = '<div style="text-align: center; margin-top: 50px; font-family: sans-serif;"><h2>Access Denied</h2><p>Password required.</p></div>';
        document.body.style.visibility = 'visible';
        return;
    }
    
    // Simple hash function (not cryptographically secure, just obfuscation)
    async function simpleHash(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Verify password
    simpleHash(password).then(hash => {
        if (hash === CORRECT_HASH) {
            sessionStorage.setItem('auth', CORRECT_HASH);
            document.body.style.visibility = 'visible';
        } else {
            document.body.innerHTML = '<div style="text-align: center; margin-top: 50px; font-family: sans-serif;"><h2>Access Denied</h2><p>Incorrect password.</p><button onclick="location.reload()">Try Again</button></div>';
            document.body.style.visibility = 'visible';
        }
    });
})();
