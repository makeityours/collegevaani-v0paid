import { AuthService, TokenPayload } from './auth-service';
import jwt from 'jsonwebtoken';
import { config } from '@/lib/config/environment';
import { AuthenticationError } from '@/lib/errors/error-handler';

// Mock Next.js request
const createMockRequest = (options: {
  headers?: Record<string, string>;
  cookies?: Record<string, { name: string; value: string }>;
}) => {
  const headers = new Map<string, string>();
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers.set(key.toLowerCase(), value);
    });
  }

  const cookies = {
    get: (name: string) => options.cookies?.[name],
    getAll: () => Object.values(options.cookies || {}),
  };

  return { headers, cookies } as any;
};

describe('AuthService', () => {
  const mockPayload: TokenPayload = {
    userId: '123',
    email: 'test@example.com',
    role: 'student',
  };

  beforeEach(() => {
    // Reset config values before each test
    jest.clearAllMocks();
  });

  describe('Token Generation', () => {
    test('should generate access token', () => {
      const token = AuthService.generateAccessToken(mockPayload);
      expect(typeof token).toBe('string');
      
      // Verify token contents
      const decoded = jwt.verify(token, config.auth.jwtSecret) as any;
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
      expect(decoded.type).toBe('access');
    });

    test('should generate refresh token', () => {
      const token = AuthService.generateRefreshToken(mockPayload);
      expect(typeof token).toBe('string');
      
      // Verify token contents
      const decoded = jwt.verify(token, config.auth.jwtRefreshSecret) as any;
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
      expect(decoded.type).toBe('refresh');
    });

    test('should generate token pair', () => {
      const { accessToken, refreshToken } = AuthService.generateTokenPair(mockPayload);
      expect(typeof accessToken).toBe('string');
      expect(typeof refreshToken).toBe('string');
    });
  });

  describe('Token Verification', () => {
    test('should verify valid access token', () => {
      const token = AuthService.generateAccessToken(mockPayload);
      const decoded = AuthService.verifyAccessToken(token);
      
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
      expect(decoded.type).toBe('access');
    });

    test('should verify valid refresh token', () => {
      const token = AuthService.generateRefreshToken(mockPayload);
      const decoded = AuthService.verifyRefreshToken(token);
      
      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.email).toBe(mockPayload.email);
      expect(decoded.role).toBe(mockPayload.role);
      expect(decoded.type).toBe('refresh');
    });

    test('should throw error for invalid access token', () => {
      expect(() => {
        AuthService.verifyAccessToken('invalid-token');
      }).toThrow(AuthenticationError);
    });

    test('should throw error for invalid refresh token', () => {
      expect(() => {
        AuthService.verifyRefreshToken('invalid-token');
      }).toThrow(AuthenticationError);
    });

    test('should throw error for wrong token type', () => {
      // Generate refresh token but verify as access token
      const refreshToken = AuthService.generateRefreshToken(mockPayload);
      expect(() => {
        AuthService.verifyAccessToken(refreshToken);
      }).toThrow('Invalid token type');
    });
  });

  describe('Token Extraction', () => {
    test('should extract access token from Authorization header', () => {
      const accessToken = AuthService.generateAccessToken(mockPayload);
      const request = createMockRequest({
        headers: { 'authorization': `Bearer ${accessToken}` }
      });
      
      const extractedToken = AuthService.extractAccessTokenFromRequest(request);
      expect(extractedToken).toBe(accessToken);
    });

    test('should extract access token from cookies', () => {
      const accessToken = AuthService.generateAccessToken(mockPayload);
      const request = createMockRequest({
        cookies: { 'access_token': { name: 'access_token', value: accessToken } }
      });
      
      const extractedToken = AuthService.extractAccessTokenFromRequest(request);
      expect(extractedToken).toBe(accessToken);
    });

    test('should extract refresh token from Authorization header', () => {
      const refreshToken = AuthService.generateRefreshToken(mockPayload);
      const request = createMockRequest({
        headers: { 'authorization': `Refresh ${refreshToken}` }
      });
      
      const extractedToken = AuthService.extractRefreshTokenFromRequest(request);
      expect(extractedToken).toBe(refreshToken);
    });

    test('should extract refresh token from cookies', () => {
      const refreshToken = AuthService.generateRefreshToken(mockPayload);
      const request = createMockRequest({
        cookies: { 'refresh_token': { name: 'refresh_token', value: refreshToken } }
      });
      
      const extractedToken = AuthService.extractRefreshTokenFromRequest(request);
      expect(extractedToken).toBe(refreshToken);
    });
  });

  describe('Role Checking', () => {
    test('should return true for user with required role', () => {
      const hasRole = AuthService.checkRole('admin', ['admin', 'moderator']);
      expect(hasRole).toBe(true);
    });

    test('should return false for user without required role', () => {
      const hasRole = AuthService.checkRole('student', ['admin', 'moderator']);
      expect(hasRole).toBe(false);
    });
  });
}); 