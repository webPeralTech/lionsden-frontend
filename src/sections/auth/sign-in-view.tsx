import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { useAuth } from 'src/auth/auth-context';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('superadmin@lionsdenresorts.com');
  const [password, setPassword] = useState('Anshit@123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (role: 'SUPER_ADMIN') => {
    if (role === 'SUPER_ADMIN') {
      setEmail('superadmin@lionsdenresorts.com');
      setPassword('Anshit@123');
    }
  };

  return (
    <Card sx={{ p: 4, width: 1, maxWidth: 460 }}>
      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Box
          component="img"
          alt="LionsDen Resort"
          src="/assets/icons/workspaces/logo-1.webp"
          sx={{ width: 64, height: 64, borderRadius: 2 }}
        />
        <Typography variant="h4" sx={{ fontWeight: 'fontWeightBold', textAlign: 'center' }}>
          LionsDen Luxury Resorts
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Resort Management System (Ahmedabad & Dhari)
        </Typography>
      </Box>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSignIn} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          fullWidth
          name="email"
          label="Staff Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading}
          sx={{ py: 1.2, fontWeight: 'fontWeightBold' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In to Portal'}
        </Button>
      </Box>

      <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed', borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
          Quick Demo Credentials:
        </Typography>
        <Chip
          label="Super Admin: superadmin@lionsdenresorts.com"
          size="small"
          onClick={() => setDemoCredentials('SUPER_ADMIN')}
          sx={{ cursor: 'pointer', fontSize: 11 }}
        />
      </Box>
    </Card>
  );
}
