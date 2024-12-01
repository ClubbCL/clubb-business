export function validateRUT(rut: string): boolean {
  if (!/^\d{7,8}-[0-9Kk]$/.test(rut)) {
    return false;
  }

  const [body, verifier] = rut.split('-');
  const digits = body.split('').reverse();
  let multiplier = 2;
  const sum = digits.reduce((acc, digit) => {
    acc += parseInt(digit, 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
    return acc;
  }, 0);

  const calculatedVerifier = 11 - (sum % 11);
  const normalizedVerifier =
    calculatedVerifier === 11 ? '0' : calculatedVerifier === 10 ? 'K' : `${calculatedVerifier}`;

  return normalizedVerifier.toUpperCase() === verifier.toUpperCase();
}
