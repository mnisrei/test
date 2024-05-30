import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from ' components-materialUi/pages/Login';

describe('LoginForm', () => {
  it('renders the login form components correctly', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('requires username and password', async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findAllByText(/is required/i)).toHaveLength(2);
  });

  it('submits the form with username and password', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });

    consoleSpy.mockRestore();
  });
});
