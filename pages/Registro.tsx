import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Key, Mail, User, Building, Globe, Share, MapPin } from '../icons';
import { UserProfile, UserRole } from '../types/auth';

const RegistroPage: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<UserRole>('visitante');
    const navigate = useNavigate();
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Common fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Organizer specific fields
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [socialMedia, setSocialMedia] = useState('');
    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const profileData: Omit<UserProfile, 'uid' | 'email'> = {
            role: selectedRole,
            name,
            ...(selectedRole === 'organizador' && {
                companyName,
                companyLocation,
                website,
                socialMedia,
            }),
        };

        try {
            if (password.length < 6) {
                throw new Error("Weak password");
            }
            await register(email, password, profileData);
            navigate('/explorar', { replace: true });
        } catch (err: any) {
             if (err.message === 'Email already in use') {
                setError('Este correo electrónico ya está en uso.');
            } else if (err.message === 'Weak password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else {
                setError('Ocurrió un error durante el registro.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const roleTabClasses = (role: UserRole) => 
        `px-6 py-2.5 font-semibold rounded-t-lg cursor-pointer transition-colors w-1/2 text-center ${
            selectedRole === role 
            ? 'bg-white text-primary' 
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`;

    return (
        <div className="min-h-full flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-extrabold text-center text-dark mb-2">Crea tu Cuenta</h2>
                <p className="text-center text-gray-500 mb-8">Únete a SivarSpot y descubre lo mejor de El Salvador.</p>
                
                <div className="flex border-b-2 border-gray-200 mb-6">
                    <div onClick={() => setSelectedRole('visitante')} className={roleTabClasses('visitante')}>
                        Soy Visitante
                    </div>
                    <div onClick={() => setSelectedRole('organizador')} className={roleTabClasses('organizador')}>
                        Soy Organizador
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleRegister}>
                    {selectedRole === 'visitante' ? (
                        <>
                             <Input icon={<User className="w-5 h-5 text-gray-400"/>} type="text" placeholder="Nombre completo" required value={name} onChange={e => setName(e.target.value)} />
                             <Input icon={<Mail className="w-5 h-5 text-gray-400"/>} type="email" placeholder="Correo electrónico" required value={email} onChange={e => setEmail(e.target.value)} />
                             <Input icon={<Key className="w-5 h-5 text-gray-400"/>} type="password" placeholder="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} />
                        </>
                    ) : (
                         <>
                            <p className="text-sm font-semibold text-gray-700 -mb-2">Información de la Empresa</p>
                            <Input icon={<Building className="w-5 h-5 text-gray-400"/>} type="text" placeholder="Nombre de la empresa" required value={companyName} onChange={e => setCompanyName(e.target.value)} />
                            <Input icon={<MapPin className="w-5 h-5 text-gray-400"/>} type="text" placeholder="Ubicación de la empresa" required value={companyLocation} onChange={e => setCompanyLocation(e.target.value)} />
                            <Input icon={<Globe className="w-5 h-5 text-gray-400"/>} type="url" placeholder="Página web (opcional)" value={website} onChange={e => setWebsite(e.target.value)} />
                            <Input icon={<Share className="w-5 h-5 text-gray-400"/>} type="url" placeholder="Redes sociales (opcional)" value={socialMedia} onChange={e => setSocialMedia(e.target.value)} />
                            
                            <p className="text-sm font-semibold text-gray-700 pt-4 -mb-2">Información del Contacto</p>
                            <Input icon={<User className="w-5 h-5 text-gray-400"/>} type="text" placeholder="Nombre del contacto" required value={name} onChange={e => setName(e.target.value)} />
                            <Input icon={<Mail className="w-5 h-5 text-gray-400"/>} type="email" placeholder="Correo electrónico de contacto" required value={email} onChange={e => setEmail(e.target.value)} />
                            <Input icon={<Key className="w-5 h-5 text-gray-400"/>} type="password" placeholder="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} />
                        </>
                    )}

                    {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta? <Link to="/login" className="font-medium text-primary cursor-pointer hover:underline">Inicia sesión aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistroPage;