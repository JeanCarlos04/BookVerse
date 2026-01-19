import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegisterFormType {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterFormType>();

  const navigate = useNavigate();

  const handleRegister = handleSubmit(async (data: RegisterFormType) => {
    const { username, email, password } = data;
    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) navigate("/login");

    reset();
  });

  return (
    <main>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        <p className="text-red-500">{errors.username?.message}</p>
        <input
          type="text"
          {...register("email", { required: "Email is required" })}
        />
        <p className="text-red-500">{errors.email?.message}</p>
        <input
          type="text"
          {...register("password", { required: "Password is required" })}
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <button>Send</button>
      </form>
    </main>
  );
}

export default Register;
