import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import TaxCalc from './pages/TaxCalc'

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tax-calc" element={<TaxCalc />} />
        <Route
          path="*"
          element={
            <div className="max-w-3xl mx-auto px-6 py-16">
              <p className="text-slate-600 mb-4">页面不存在。</p>
              <Link className="text-blue-600 hover:underline" to="/">
                返回首页
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

