"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prompts } from "@/src/lib/promptTemplate"; // 프롬프트 세트 불러오기

// 🎨 7가지 파스텔 테마 정의
const THEMES = [
  { id: "mint", name: "🌿 Mint Breeze", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  { id: "pink", name: "🌸 Pink Bloom", bg: "bg-pink-50", ring: "ring-pink-200" },
  { id: "sky", name: "☁️ Sky Calm", bg: "bg-sky-50", ring: "ring-sky-200" },
  { id: "yellow", name: "🌼 Sunny Light", bg: "bg-yellow-50", ring: "ring-yellow-200" },
  { id: "lavender", name: "🌙 Lavender Dream", bg: "bg-violet-50", ring: "ring-violet-200" },
  { id: "olive", name: "🍃 Olive Harmony", bg: "bg-lime-50", ring: "ring-lime-200" },
  { id: "gray", name: "⚫ Classic Gray", bg: "bg-gray-50", ring: "ring-gray-200" },
];

export default function Page() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("일상/라이프");
  const [theme, setTheme] = useState("mint");
  const [selectedType, setSelectedType] = useState("info");
  const [htmlOut, setHtmlOut] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const activeTheme = useMemo(() => THEMES.find(t => t.id === theme)!, [theme]);

  // ✨ HTML 생성 로직 (예시용 샘플)
  const handleGenerate = () => {
    if (!topic.trim()) return alert("주제를 입력해주세요 ✍️");

    setLoading(true);
    setTimeout(() => {
      const prompt = prompts[selectedType].template;
      const html = `
<article class="prose max-w-none">
<h1>${topic} | ${prompts[selectedType].name}</h1>
<p>카테고리: ${category}</p>
<hr/>
<h2>🌈 테마: ${activeTheme.name}</h2>
<p>선택된 포스팅 템플릿 설명:</p>
<pre>${prompt.slice(0, 400)}...</pre>
<p>💡 본문 예시 생성 완료 (이 부분에서 실제 GPT API 연결 시 자동으로 HTML 본문 생성됩니다)</p>
</article>`;
      setHtmlOut(html);
      setLoading(false);
    }, 700);
  };

  const handleCopy = async () => {
    if (!htmlOut) return;
    await navigator.clipboard.writeText(htmlOut);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`min-h-screen ${activeTheme.bg} px-4 py-8 font-sans`}>
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-8 bg-white shadow ring-1 ${activeTheme.ring}`}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            ✨ 루미 블로그 에이전트 v3
          </h1>
          <p className="text-gray-600 mt-2">
            주제 입력 → 테마 선택 → 템플릿 선택 → HTML 자동 생성 🪄
          </p>

          {/* INPUT */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-700">블로그 주제 ✍️</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 수면의 질 높이는 루틴"
                className="w-full mt-1 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">카테고리 🗂️</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="예: 건강/라이프"
                className="w-full mt-1 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>
          </div>

          {/* THEME SELECTION */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">🎨 테마 선택</h2>
            <div className="flex flex-wrap gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-2xl px-3 py-2 text-sm shadow-sm ${
                    theme === t.id
                      ? `bg-white ring-2 ${t.ring}`
                      : `bg-gray-100 hover:bg-gray-200`
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* TEMPLATE SELECTION */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">🧠 포스팅 템플릿 선택</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(prompts).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`rounded-2xl p-3 text-left text-sm shadow-sm ${
                    selectedType === key
                      ? `ring-2 ring-emerald-300 bg-white`
                      : `bg-gray-50 hover:bg-gray-100`
                  }`}
                >
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SELECTED PREVIEW */}
          <div className="mt-4 p-4 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
            <h3 className="font-bold text-gray-700">{prompts[selectedType].name}</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line mt-2">
              {prompts[selectedType].template.slice(0, 300)}...
            </p>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-3 rounded-2xl px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600"
            >
              {loading ? "생성 중... ⏳" : "🪄 HTML 생성하기"}
            </button>
          </div>
        </motion.div>

        {/* OUTPUT PREVIEW */}
        <AnimatePresence>
          {htmlOut && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6"
            >
              <div className="rounded-3xl p-6 bg-white shadow ring-1 ring-gray-200">
                <h2 className="text-xl font-bold mb-3">미리보기 🪄</h2>
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: htmlOut }}
                />
                <button
                  onClick={handleCopy}
                  className="mt-4 rounded-2xl px-4 py-2 bg-black text-white hover:bg-gray-800"
                >
                  {copied ? "✅ 복사됨" : "📋 HTML 복사"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <p className="mt-10 text-center text-xs text-gray-500">
          ⓒ Grew Blog Agent · SEO / 쿠팡 / 애드센스 / 루미 감성형 지원 🌸
        </p>
      </div>
    </div>
  );
}
