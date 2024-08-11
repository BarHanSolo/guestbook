export function simpleID(prefix?: string): string {
	const uniquePart = Math.random().toString(36).substring(2, 9);

	return prefix ? `${prefix}-${uniquePart}` : uniquePart;
}
