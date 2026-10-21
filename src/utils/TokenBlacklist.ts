// utils/TokenBlacklist.ts
class TokenBlacklist {
  private blacklist: Set<string> = new Set();

  public add(token: string): void {
    this.blacklist.add(token);
  }

  public has(token: string): boolean {
    return this.blacklist.has(token);
  }
}

export const tokenBlacklist = new TokenBlacklist();