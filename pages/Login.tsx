import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Key, Mail, Eye, EyeOff } from '../icons';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();
    
    const redirectPath = searchParams.get('redirect') || '/explorar';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate(redirectPath, { replace: true });
        } catch (err: any) {
            // Simplified error handling for mock context
            setError('Correo electrónico o contraseña incorrectos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-dark mb-2">Bienvenido de nuevo</h2>
                <p className="text-center text-gray-500 mb-8">Inicia sesión para continuar en SivarSpot.</p>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <Input icon={<Mail className="w-5 h-5 text-gray-400"/>} type="email" placeholder="Correo electrónico" required value={email} onChange={e => setEmail(e.target.value)} />
                    <div className="relative">
                        <Input icon={<Key className="w-5 h-5 text-gray-400"/>} type={showPassword ? "text" : "password"} placeholder="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label={showPassword ? "Hide password" : "Show password"}>
                            {showPassword ? <EyeOff className="w-5 h-5 text-gray-500"/> : <Eye className="w-5 h-5 text-gray-500"/>}
                        </button>
                    </div>

                    {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </Button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    ¿No tienes cuenta? <Link to="/registro" className="font-medium text-primary cursor-pointer hover:underline">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;