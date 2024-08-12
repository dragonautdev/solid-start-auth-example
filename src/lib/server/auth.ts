import { useSession } from "vinxi/http";
import { redirect } from "@solidjs/router";
import { INTERNAL_APP_ID } from "../constants";

const SESSION_SECRET = "thisisadummysessionsecretverylongbutnotgood";

const VALID_ACCOUNT_IDS = ['account1', 'account2'];

export type SessionData = {
  appId?: string;
  accountId?: string;
};

export async function getSession() {
  const session = await useSession<SessionData>({
    password: process.env.SESSION_SECRET ?? SESSION_SECRET,
    maxAge: 24 * 60 * 60, // 1 day in seconds
  });

  return session
}

export async function authenticate(externalAccountId: string) {
  
  if (!VALID_ACCOUNT_IDS.includes(externalAccountId)) {
    throw new Error('Invalid account ID');
  }
  const session = await getSession();
  await session.update({
    appId: INTERNAL_APP_ID,
    accountId: externalAccountId,
  });
}

export async function logout() {
  const session = await getSession();
  await session.update({
    appId: undefined,
    accountId: undefined
  })
}
