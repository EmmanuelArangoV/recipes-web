import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/services/userService';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }

    await createUser(name, email, password);
    return NextResponse.json({ message: 'Usuario creado' }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '';
    const isKnown = message === 'El email ya está en uso';
    return NextResponse.json(
      { error: isKnown ? message : 'Error interno del servidor' },
      { status: isKnown ? 400 : 500 }
    );
  }
}