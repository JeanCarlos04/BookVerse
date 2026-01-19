import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextHook from "../hooks/useContextHook";

interface LoginFormType {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LoginFormType>();
  const { getUser } = useContextHook();

  const navigate = useNavigate();

  const login = handleSubmit(async (data: LoginFormType) => {
    const { email, password } = data;

    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      navigate("/");
      getUser();
    }

    reset();
  });

  return (
    <main>
      <form onSubmit={login}>
        <h1>Login</h1>
        <input
          placeholder="Email"
          type="text"
          {...register("email", { required: "Email is required" })}
        />
        <p className="text-red-500">{errors.email?.message}</p>
        <input
          placeholder="Password"
          type="text"
          {...register("password", { required: "Password is required" })}
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <button
          className="data-[active=true]:bg-yellow-300"
          data-active="true"
          name="sendLogin"
        >
          Send
        </button>
      </form>
    </main>
  );
}

export default Login;
