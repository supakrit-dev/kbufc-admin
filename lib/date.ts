import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string | Date) {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        return format(date, 'd LLLL, yyyy'); // ตัวอย่าง: 24 November, 2025
}
