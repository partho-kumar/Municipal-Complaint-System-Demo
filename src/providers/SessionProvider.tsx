"use client";

import { SessionProvider as NextauthSessionProvider } from "next-auth/react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    return <NextauthSessionProvider>{children}</NextauthSessionProvider>;
};

export default SessionProvider;
