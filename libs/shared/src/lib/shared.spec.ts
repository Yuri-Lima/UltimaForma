import { validate } from 'class-validator';
import { LoginDto } from '../dto/login.dto';
import { API_BASE } from '../constants/api';

describe('shared', () => {
  describe('LoginDto', () => {
    it('should validate valid login', async () => {
      const dto = Object.assign(new LoginDto(), {
        email: 'test@example.com',
        password: 'password123',
      });
      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should reject invalid email', async () => {
      const dto = Object.assign(new LoginDto(), {
        email: 'invalid',
        password: 'password123',
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });

    it('should reject empty password', async () => {
      const dto = Object.assign(new LoginDto(), {
        email: 'test@example.com',
        password: '',
      });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });
  });

  describe('API_BASE', () => {
    it('should be /api', () => {
      expect(API_BASE).toBe('/api');
    });
  });
});
