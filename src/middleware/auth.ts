import { RequestMiddleware } from "@solidjs/start/middleware";
import { auth } from "~/lib/server";
import { SessionData } from "~/lib/server/auth";

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    session?: SessionData;
  }
}

const authMiddleware: RequestMiddleware = async ({
  locals,
}) => {
  const session = await auth.getSession();

  locals.session = session.data;
};

export default authMiddleware;
