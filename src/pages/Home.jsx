import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            实用在线工具集
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            发现并使用简洁、高效、专业的在线小工具。无需安装，即开即用，完全免费。
          </p>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              北京裁员补偿计算器
            </h2>
            <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
              依据北京 2024-2025 最新平均工资标准及《劳动合同法》开发。支持高薪封顶逻辑、N/N+1/2N
              方案及个税深度拆解。
            </p>
            <Link
              to="/tax-calc"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition active:scale-95"
            >
              立即使用
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-400">
              更多工具正在路上...
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              五险一金计算、年假推算等工具正在规划中
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm italic">“我们通过创造工具来塑造自己。”</p>
        </div>
      </footer>
    </div>
  )
}

