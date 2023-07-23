import useAxiosAuth from "./useAxiosAuth"
import useAuth from "./useAuth"

const useRefreshToken = () => {
  //console.log("WTF");
  /*  const { setAuth } = useAuth() */
  const axios = useAxiosAuth()

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    })
    /*     setAuth((prev) => {
      //console.log("SET AUTH WITH: " + JSON.stringify(response.data))
      return {
        ...prev,
        email: response.data.email,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        user_id: response.data.user_id,
      }
    }) */
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken
