import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../Svg/GoogleIcon";
import axios from "axios";

export default function Login({ setUser }) {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post("http://localhost:3001/auth/google", {
        code: codeResponse.code,
      });

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokens.data.access_token}`,
          },
        }
      );
      setUser(userInfo.data);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="w-full my-16 max-w-md bg-gray-100 shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
      <form>
        {["email", "password"].map((input) => (
          <div key={input} className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={input}
            >
              {input[0].toUpperCase() + input.slice(1)}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={input}
              type={input}
              placeholder={`Enter your ${input}`}
            />
          </div>
        ))}
        <p>Or</p>
        <div className="my-6">
          <button
            onClick={() => googleLogin()}
            className="flex items-center justify-center md:justify-start gap-4 text-nowrap text-base font-monserrat font-semibold w-full text-black shadow bg-white rounded py-2 px-3"
          >
            <GoogleIcon />
            <span className="font-bold">Login with Google</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
