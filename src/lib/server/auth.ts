import { getRequestEvent } from "solid-js/web";
import { useSession } from "vinxi/http";

// TODO: Replace all of this with a proper auth system
const SESSION_SECRET = "thisisadummysessionsecretverylongbutnotgood";

const VALID_EMAILS = ['test@test.com', 'test@example.com'];

export type SessionData = {
  email?: string;
  id?: string;
  accountId?: string;
};

export async function getSession() {
  const session = await useSession<SessionData>({
    password: process.env.SESSION_SECRET ?? SESSION_SECRET,
    maxAge: 24 * 60 * 60, // 1 day in seconds
  });

  return session
}

export async function authenticate(email: string, password: string) {
  
  if (!VALID_EMAILS.includes(email)) {
    throw new Error('Invalid email');
  }
  const session = await getSession();
  await session.update({
    email: email,
    id: VALID_EMAILS.indexOf(email).toString(),
    accountId: 'account'
  });
}

export async function logout() {
  const session = await getSession();
  await session.update({
    email: undefined,
    id: undefined,
    accountId: undefined,
  })
}

export function ensureAuthenticated(): SessionData {
  const request = getRequestEvent()
  let session = request?.locals.session
  if (!session?.id || !session?.accountId || !session?.email) {
    throw new Error('Unauthorized')
  }
  return session
}