import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../../hooks/auth';

describe('Auth hook', () => {
    it('should be able to sign in', () => {
        const {} = renderHook(() => useAuth())
    })
})