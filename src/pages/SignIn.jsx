import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

const stagger = (i) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
})

const SignIn = () => {
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()



  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setApiError('')
    setLoading(true)

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        setApiError(error.message)
        return
      }

      navigate('/dashboard')
    } catch (error) {
      setApiError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }

    }


  return (
    <section className="relative isolate flex min-h-[calc(100vh-57px)] items-center justify-center overflow-hidden bg-light-bg-primary px-6 py-16 dark:bg-dark-bg-primary">
      {/* Paper grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-150 w-150 -translate-x-1/2 rounded-full bg-light-accent/4 blur-[100px] dark:bg-dark-accent/6"
      />

      <motion.div
        variants={stagger(0)}
        initial="hidden"
        animate="visible"
        className="w-full max-w-104"
      >
        {/* Card */}
        <div className="rounded-2xl border border-light-border bg-light-surface p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 dark:border-dark-border dark:bg-dark-surface dark:shadow-none">
          {/* Logo + heading */}
          <motion.div
            variants={stagger(1)}
            initial="hidden"
            animate="visible"
            className="mb-8 flex flex-col items-center gap-5"
          >
            <Link
              to="/"
              aria-label="Back to Frontpage"
              className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-light-text-primary font-serif text-lg italic text-white dark:bg-dark-text-primary dark:text-dark-bg-primary">
                f
              </span>
              <span className="font-serif text-xl tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
                Frontpage
              </span>
            </Link>

            <div className="text-center">
              <h1 className="font-serif text-2xl tracking-[-0.02em] text-light-text-primary dark:text-dark-text-primary">
                Welcome back
              </h1>
              <p className="mt-1.5 font-sans text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Sign in to your front page.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={stagger(2)}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-xs font-medium tracking-wide text-light-text-secondary uppercase dark:text-dark-text-secondary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-light-border bg-light-bg-secondary px-4 py-3 font-sans text-base text-light-text-primary outline-none transition-all duration-200 placeholder:text-light-text-tertiary hover:border-light-text-tertiary focus:border-light-accent focus:ring-2 focus:ring-light-accent/20 dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary dark:hover:border-dark-text-tertiary dark:focus:border-dark-accent dark:focus:ring-dark-accent/20"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-light-error dark:text-dark-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-sans text-xs font-medium tracking-wide text-light-text-secondary uppercase dark:text-dark-text-secondary"
                >
                  Password
                </label>
                {/* TODO: Uncomment when forgot password logic is ready */}
                {apiError && (
                  <Link
                    to="/forgot-password"
                    className="font-sans text-xs font-medium text-light-accent underline decoration-light-accent/30 underline-offset-2 transition-colors hover:text-light-accent-hover hover:decoration-light-accent dark:text-dark-accent dark:decoration-dark-accent/30 dark:hover:text-dark-accent-hover dark:hover:decoration-dark-accent"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-light-border bg-light-bg-secondary px-4 py-3 pr-11 font-sans text-base text-light-text-primary outline-none transition-all duration-200 placeholder:text-light-text-tertiary hover:border-light-text-tertiary focus:border-light-accent focus:ring-2 focus:ring-light-accent/20 dark:border-dark-border dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary dark:hover:border-dark-text-tertiary dark:focus:border-dark-accent dark:focus:ring-dark-accent/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-tertiary transition-colors hover:text-light-text-secondary dark:text-dark-text-tertiary dark:hover:text-dark-text-secondary"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-light-error dark:text-dark-error">{errors.password}</p>
              )}
            </div>

            {/* API error */}
            {apiError && (
              <div className="rounded-lg border border-light-error/20 bg-light-error/5 px-4 py-3 text-sm text-light-error dark:border-dark-error/20 dark:bg-dark-error/5 dark:text-dark-error">
                {apiError}
              </div>
            )}

            {/* Submit */}
            <motion.button
              variants={stagger(3)}
              initial="hidden"
              animate="visible"
              type="submit"
              disabled={loading}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-light-text-primary px-8 py-3.5 font-sans text-base font-medium text-white transition-all duration-200 hover:bg-light-text-primary/85 hover:scale-[1.01] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 dark:bg-dark-text-primary dark:text-dark-bg-primary dark:hover:bg-dark-text-primary/90"
            >
              {loading && <ClipLoader size={16} color="currentColor" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div
            variants={stagger(4)}
            initial="hidden"
            animate="visible"
            className="my-6 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-light-border dark:bg-dark-border" />
            <span className="font-sans text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
              or
            </span>
            <div className="h-px flex-1 bg-light-border dark:bg-dark-border" />
          </motion.div>

          {/* Sign up link */}
          <motion.p
            variants={stagger(5)}
            initial="hidden"
            animate="visible"
            className="text-center font-sans text-sm text-light-text-secondary dark:text-dark-text-secondary"
          >
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-light-accent underline decoration-light-accent/30 underline-offset-2 transition-colors hover:text-light-accent-hover hover:decoration-light-accent dark:text-dark-accent dark:decoration-dark-accent/30 dark:hover:text-dark-accent-hover dark:hover:decoration-dark-accent"
            >
              Create one
            </Link>
          </motion.p>
        </div>

        {/* Footer note */}
        <motion.p
          variants={stagger(6)}
          initial="hidden"
          animate="visible"
          className="mt-6 text-center font-sans text-xs leading-relaxed text-light-text-tertiary dark:text-dark-text-tertiary"
        >
          By signing in you agree to our Terms of Service and Privacy Policy.
        </motion.p>
      </motion.div>
    </section>
  )
}

export default SignIn
