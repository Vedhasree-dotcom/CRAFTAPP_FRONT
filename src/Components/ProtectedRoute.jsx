export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) return null; 
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
