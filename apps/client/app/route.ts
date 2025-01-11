import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function GET() {
    const token = cookies().get('authorization')?.value;

    if (token) {
        return redirect(`/marketplace`);
    }

    return redirect(`/auth/login`);
}
