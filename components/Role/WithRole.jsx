import { useAuth } from "../../context/AuthContext";

export default function WithRole({ role, children }) {
  const { authState } = useAuth();
  const roles = Array.isArray(role) ? role : [role];

  if (roles.includes(authState.role)) {
    return children;
  }

  return null;
}
