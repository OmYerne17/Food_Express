"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  })
  const [error, setError] = React.useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          login: true
        })
      });
      const data = await response.json();
      if (data.success && data.result) {
        localStorage.setItem("User", JSON.stringify(data.result));
        router.push("/user/dashboard");
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500">Enter your credentials to access your account</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Button
          variant="link"
          onClick={() => router.push("/user/signup")}
          className="p-0"
        >
          Sign up
        </Button>
      </div>
    </div>
  )
} 