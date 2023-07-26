import { createContext, useState } from "react";
import { apiMe } from "../API";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  const [gymId, setGymId] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState();

  const getToken = async () => {
    setLoading(true);
    const response = await apiMe()
      .then((response) => {
        if (response.status === 200) {
          setMe(response.data);
          setRole(response.data.role);
          setGymId(response.data.gym_id);
          setAuth(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setAuth(false);
        setLoading(false);
      });
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          gymId,
          setGymId,
          getToken,
          role,
          loading,
          setLoading,
          me,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
