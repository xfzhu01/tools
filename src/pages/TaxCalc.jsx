import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BEIJING_BASE_CAP,
  BEIJING_TAX_FREE,
  calculateSeverance,
} from '../lib/severance'

function formatCNY(value) {
  return `¥ ${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function TaxCalc() {
  const [avgSalary, setAvgSalary] = useState('')
  const [otherAmount, setOtherAmount] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const [leaveDate, setLeaveDate] = useState('')
  const [planType, setPlanType] = useState('N+1')
  const [baseType, setBaseType] = useState('legal')
  const [submittedAt, setSubmittedAt] = useState(0)

  const parsed = useMemo(() => {
    const avg = Number(avgSalary || 0)
    const other = Number(otherAmount || 0)
    return {
      avgSalary: Number.isFinite(avg) ? avg : 0,
      otherAmount: Number.isFinite(other) ? other : 0,
    }
  }, [avgSalary, otherAmount])

  const result = useMemo(() => {
    if (!submittedAt) return null
    if (!parsed.avgSalary || !joinDate || !leaveDate) return { error: '请输入完整信息' }

    const r = calculateSeverance({
      avgSalary: parsed.avgSalary,
      otherAmount: parsed.otherAmount,
      joinDateISO: joinDate,
      leaveDateISO: leaveDate,
      planType,
      baseType,
    })
    if (!r) return { error: '请输入完整信息' }
    return r
  }, [submittedAt, parsed, joinDate, leaveDate, planType, baseType])

  const taxDetailText = useMemo(() => {
    if (!result || result.error) return null
    if (result.taxableIncome > 0) {
      return `您的税前补偿(${formatCNY(
        result.severancePreTax,
      )})已超北京免税额(${formatCNY(
        BEIJING_TAX_FREE,
      )})。应纳税部分 ${formatCNY(
        result.taxableIncome,
      )} 适用年度综合所得税率表计算，共扣税 ${formatCNY(result.tax)}。`
    }
    return `您的税前补偿未超过北京免税额度(${formatCNY(
      BEIJING_TAX_FREE,
    )})，依法全额免个税。`
  }, [result])

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                离职补偿计算器
              </h1>
            </div>
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-700 shadow-sm">
              北京 2025.01版
            </span>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-600">
                  前12个月平均工资 (税前)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">¥</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(e.target.value)}
                    placeholder="月均工资"
                    className="w-full pl-8 p-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-blue-700">
                  其他税后收入 (如报销、净奖金)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-blue-300">¥</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={otherAmount}
                    onChange={(e) => setOtherAmount(e.target.value)}
                    placeholder="直接计入到手金额"
                    className="w-full pl-8 p-3 border border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-blue-50/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600">
                计算基数逻辑
              </label>
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setBaseType('legal')}
                  className={
                    baseType === 'legal'
                      ? 'flex-1 py-2 text-sm rounded-lg transition-all font-medium bg-white shadow-sm text-blue-600'
                      : 'flex-1 py-2 text-sm rounded-lg transition-all font-medium text-slate-500'
                  }
                >
                  法定封顶 (社平3倍)
                </button>
                <button
                  type="button"
                  onClick={() => setBaseType('actual')}
                  className={
                    baseType === 'actual'
                      ? 'flex-1 py-2 text-sm rounded-lg transition-all font-medium bg-white shadow-sm text-blue-600'
                      : 'flex-1 py-2 text-sm rounded-lg transition-all font-medium text-slate-500'
                  }
                >
                  不封顶 (实际月薪)
                </button>
              </div>
              <p className="text-[12px] text-slate-400">
                北京封顶月基数：{formatCNY(BEIJING_BASE_CAP)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-600">
                  入职日期
                </label>
                <input
                  type="date"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-slate-600">
                  离职日期
                </label>
                <input
                  type="date"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-600">
                补偿方案
              </label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 outline-none bg-white"
              >
                <option value="N">N (标准经济补偿)</option>
                <option value="N+1">N+1 (含代通知金)</option>
                <option value="2N">2N (违法解除赔偿)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setSubmittedAt(Date.now())}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              立即生成结算单
            </button>

            {result?.error ? (
              <p className="text-sm text-red-600">{result.error}</p>
            ) : null}

            <div className="pt-2">
              <Link className="text-sm text-slate-500 hover:underline" to="/">
                ← 返回首页
              </Link>
            </div>
          </div>
        </div>

        {result && !result.error ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/60 p-6 md:p-8">
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center border-b pb-4">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17v-2m3 2v-4m3 2v-6m-9-3H9m12 0h-3.586a1 1 0 01-.707-.293L15.414 4.414a1 1 0 00-.707-.293H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V7z"
                  />
                </svg>
                结算明细确认单
              </h2>

              <div className="space-y-1 text-sm">
                <div className="border-b border-slate-100 py-3 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">
                    1. 税前补偿金额 (Severance Pre-tax)
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatCNY(result.severancePreTax)}
                  </span>
                </div>
                <div className="border-b border-slate-100 py-3 flex justify-between items-center bg-red-50/30 px-2 -mx-2 rounded-lg">
                  <span className="text-red-500 font-medium">
                    2. 补偿金扣税金额 (Severance Tax)
                  </span>
                  <span className="font-bold text-red-600">
                    - {formatCNY(result.tax)}
                  </span>
                </div>
                <div className="border-b border-slate-100 py-3 flex justify-between items-center italic">
                  <span className="text-slate-500 font-medium">
                    3. 补偿金到手 (税后 1 - 2)
                  </span>
                  <span className="font-bold text-slate-700">
                    {formatCNY(result.severancePostTax)}
                  </span>
                </div>
                <div className="py-3 flex justify-between items-center bg-blue-50/50 px-2 -mx-2 rounded-lg">
                  <span className="text-blue-600 font-medium">
                    4. 其他税后收入 (Other Tax-free)
                  </span>
                  <span className="font-bold text-blue-600">
                    + {formatCNY(result.otherAmount)}
                  </span>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-slate-900 flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-400 uppercase">
                      最终总计到手
                    </p>
                    <p className="text-xs text-slate-400 mt-1 italic">
                      Total Net Amount
                    </p>
                  </div>
                  <div className="text-4xl font-black text-green-600">
                    {formatCNY(result.totalFinal)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl shadow-lg shadow-slate-200/40 p-6 md:p-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 leading-none">
                计算逻辑拆解
              </h3>

              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-400 mb-1">在职时长</p>
                    <p className="font-bold text-slate-800">
                      {result.tenure.years}年 {result.tenure.months}个月{' '}
                      {result.tenure.days}天
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-400 mb-1">补偿系数 (N)</p>
                    <p className="font-bold text-slate-800">{result.finalN}</p>
                  </div>
                </div>

                <div className="bg-slate-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="font-bold text-slate-700 mb-1 leading-none">
                    税金计算说明：
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed italic mt-2">
                    {taxDetailText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <p className="text-center text-slate-400 text-[11px] mt-8 mb-12 uppercase tracking-tighter">
          Beijing Severance Calculator v2025.1
        </p>
      </div>
    </div>
  )
}

