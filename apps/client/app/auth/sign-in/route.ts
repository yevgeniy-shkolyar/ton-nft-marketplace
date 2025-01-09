import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic'; // defaults to auto

const requestBodySchema = z.object({
    token: z.string().min(1, 'Token must not be empty'),
});

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();
        const { token } = requestBodySchema.parse(body);

        const response = NextResponse.json({
            message: 'Token set in HttpOnly cookie',
        });

        response.headers.set(
            'Set-Cookie',
            serialize('authorization', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            }),
        );

        return response;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: error.errors[0].message },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 },
        );
    }
}
