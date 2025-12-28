
export const validatePhoneNumber = (phone: string): { isValid: boolean, value: string, error?: string } => {
    // 1. Sanitize: Remove all non-digits
    const cleanNumber = phone.replace(/\D/g, '');

    // 2. Empty Check
    if (!cleanNumber) {
        return { isValid: false, value: '', error: 'Phone number is required' };
    }

    // 3. Country Code Logic

    // INDIA Case: Starts with 91 and has 12 digits total (91 + 10 digits)
    if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
        return { isValid: true, value: cleanNumber, error: undefined };
    }

    // USA Case: Starts with 1 and has 11 digits total (1 + 10 digits)
    if (cleanNumber.startsWith('1') && cleanNumber.length === 11) {
        return { isValid: true, value: cleanNumber, error: undefined };
    }

    // STANDARD / LOCAL Case: Must be exactly 10 digits
    // (User said "woh bhi validate lag do her country ke liye mostly usa and indian")
    // So if it's not the above specific codes, we enforce 10 digits as a general rule for local numbers
    if (cleanNumber.length === 10) {
        return { isValid: true, value: cleanNumber, error: undefined };
    }

    // INVALID Cases
    if (cleanNumber.startsWith('91') && cleanNumber.length !== 12) {
        return { isValid: false, value: cleanNumber, error: 'Invalid India number. Must be 10 digits (+91 code optional).' };
    }

    if (cleanNumber.length < 10) {
        return { isValid: false, value: cleanNumber, error: 'Phone number too short. Minimum 10 digits required.' };
    }

    if (cleanNumber.length > 15) {
        return { isValid: false, value: cleanNumber, error: 'Phone number too long.' };
    }

    // Fallback for other valid lengths if we want to be lenient, but user asked for strictness.
    // "91 hua toh sirf 10 digits" -> handled.
    // "validatete" -> forcing 10-12 range usually safe.

    return { isValid: false, value: cleanNumber, error: 'Invalid format. Please enter a valid 10-digit number.' };
};
