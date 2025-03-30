// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with your actual shop owner credentials
        const shopOwners = [
          { id: "1", username: "admin", password: "admin123", role: "shopOwner" }
        ];
        
        const user = shopOwners.find(
          (owner) => 
            owner.username === credentials.username && 
            owner.password === credentials.password
        );

        return user || null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
});