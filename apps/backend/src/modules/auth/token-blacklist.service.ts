import { Injectable, Logger } from '@nestjs/common';

interface RevokedToken {
  jti: string;
  exp: number;
  userId: string;
}

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private readonly blacklist = new Map<string, RevokedToken>();
  private readonly userTokens = new Map<string, Set<string>>();

  revoke(jti: string, userId: string, expiresInSeconds: number): void {
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    
    this.blacklist.set(jti, { jti, exp, userId });

    if (!this.userTokens.has(userId)) {
      this.userTokens.set(userId, new Set());
    }
    this.userTokens.get(userId)!.add(jti);

    const timeout = expiresInSeconds * 1000;
    setTimeout(() => {
      this.cleanup(jti, userId);
    }, timeout);

    this.logger.debug(`Token ${jti} revoked for user ${userId}, will expire in ${expiresInSeconds}s`);
  }

  isRevoked(jti: string, userId: string): boolean {
    const token = this.blacklist.get(jti);
    if (!token) return false;
    
    if (token.userId !== userId) return true;

    const now = Math.floor(Date.now() / 1000);
    if (token.exp < now) {
      this.cleanup(jti, userId);
      return false;
    }

    return true;
  }

  revokeAllForUser(userId: string): void {
    const tokens = this.userTokens.get(userId);
    if (!tokens) return;

    for (const jti of tokens) {
      this.blacklist.delete(jti);
    }
    this.userTokens.delete(userId);
    
    this.logger.debug(`All tokens revoked for user ${userId}`);
  }

  private cleanup(jti: string, userId: string): void {
    this.blacklist.delete(jti);
    const tokens = this.userTokens.get(userId);
    if (tokens) {
      tokens.delete(jti);
      if (tokens.size === 0) {
        this.userTokens.delete(userId);
      }
    }
    this.logger.debug(`Token ${jti} cleaned up from blacklist`);
  }
}