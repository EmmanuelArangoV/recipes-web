import bcrypt from 'bcryptjs';
import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { sendWelcomeEmail } from '@/app/lib/mailer';

export async function createUser(name: string, email: string, password: string) {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) throw new Error('El email ya está en uso');

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  sendWelcomeEmail(email, name).catch((err) => {
    console.error('[MAIL ERROR]', err?.message ?? err);
  });
}
